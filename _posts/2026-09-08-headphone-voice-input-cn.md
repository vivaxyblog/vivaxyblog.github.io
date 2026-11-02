---
layout: post
title: 用有线耳机的线控键控制 Mac 语音输入
tags: [config]
---

语音输入时，除了说话，还需要开始录音、输入回车，以及删除说错的内容。一副带麦克风和线控键的有线耳机，配合 Karabiner-Elements，就可以把这些操作放到同一个按钮上。

本文以连接 Mac 3.5mm 耳机孔的有线耳机为例，把播放 / 暂停键映射为三个动作：

| 操作 | 发出的按键 | 用途 |
| --- | --- | --- |
| 单击 | `fn` | 触发已配置好的语音输入快捷键 |
| 双击 | `return_or_enter` | 输入回车；应用设为回车发送时，可用于提交 |
| 长按 1 秒 | `⌘⌫` | 在常见文本框中删除光标到当前行开头的内容 |

回车的作用由当前应用决定，`⌘⌫` 也不等于清空整个输入框。后面的规则会排除访达中的 `⌘⌫`，因为它在访达中会把选中的项目移到废纸篓。[Apple 快捷键说明](https://support.apple.com/zh-cn/102650)

## 准备环境

需要一台 Mac、一副带麦克风和线控键的 3.5mm 有线耳机，以及支持快捷键唤起的语音输入工具。

Karabiner-Elements 需要 **15.4.0 或更高版本**。官方在 15.4.0 的版本说明中加入了耳机按键支持。[版本说明](https://karabiner-elements.pqrs.org/docs/releasenotes/#karabiner-elements-1540)

先在文本框中按键盘上的 `Fn`，确认它能以“单击开始、再次单击结束”的方式控制语音输入。若使用第三方输入工具，可在其设置中配置快捷键；如果系统的地球仪 / Fn 动作与它冲突，再把系统对应动作设为“不执行任何操作”。

使用 macOS 自带听写时，先在“系统设置 → 键盘 → 听写”中确认快捷键。它可能是连按两下 Fn 或其他组合键，不能假定单次 `fn` 就能触发。若所用快捷键不是单次 Fn，需要同步修改下面规则中两处发送 `fn` 的事件。[Apple 听写设置说明](https://support.apple.com/zh-cn/guide/mac-help/mh40584/mac)

## 确认耳机的输入事件

1. 插上耳机，在“系统设置 → 声音 → 输入”中选择耳机麦克风，确认说话时有输入电平。
2. 打开 Karabiner-Elements 的 **Devices** 页，找到耳机对应的设备，可能显示为 `Headset`，启用它的事件改写。
3. 暂时停用已有的相关改键规则，打开 **Karabiner-EventViewer**，观察线控键上报的原始事件。支持原始事件捕获的版本，也可以使用 **Capture Raw Input Events**。
4. 确认按下和松开对应 `consumer_key_code: play_or_pause`。双击应能看到两次按下和松开；长按时，按下到松开的间隔应能持续到 1 秒以上。

耳机按键可能属于 Consumer 设备，默认未启用改写。以 Karabiner-Elements 16.1.0 为例，源码将这类设备的 `ignore` 默认值设为 `true`，因此只添加规则还不够。[设备配置源码](https://github.com/pqrs-org/Karabiner-Elements/blob/v16.1.0/src/share/core_configuration/details/profile/device.hpp#L223-L230)

EventViewer 通常显示改写后的事件。确认原始按键时，应先停用规则或使用原始事件捕获，以免把输出事件当成输入事件。[EventViewer 使用说明](https://karabiner-elements.pqrs.org/docs/manual/operation/eventviewer/)

如果按键没有事件，或者双击、长按被设备转换成了其他事件，这份规则就不能直接套用。

## 添加规则

打开 Karabiner-Elements 的 **Complex Modifications → Add your own rule**，粘贴下面的完整规则对象并保存。这是单条规则，不需要用它覆盖整个 `karabiner.json`。[添加自定义规则说明](https://karabiner-elements.pqrs.org/docs/manual/configuration/add-your-own-complex-modifications/)

```json
{
  "description": "Headphone play/pause: tap → voice input (fn), double tap → enter, hold 1s → command-delete",
  "manipulators": [
    {
      "conditions": [
        {
          "identifiers": [
            {
              "is_built_in_keyboard": true
            }
          ],
          "type": "device_unless"
        },
        {
          "name": "play_or_pause_pressed",
          "type": "variable_if",
          "value": 1
        }
      ],
      "from": {
        "consumer_key_code": "play_or_pause"
      },
      "to": [
        {
          "key_code": "return_or_enter"
        },
        {
          "set_variable": {
            "name": "play_or_pause_pressed",
            "value": 0
          }
        }
      ],
      "type": "basic"
    },
    {
      "conditions": [
        {
          "identifiers": [
            {
              "is_built_in_keyboard": true
            }
          ],
          "type": "device_unless"
        }
      ],
      "from": {
        "consumer_key_code": "play_or_pause"
      },
      "parameters": {
        "basic.to_delayed_action_delay_milliseconds": 300,
        "basic.to_if_held_down_threshold_milliseconds": 1000
      },
      "to": [
        {
          "set_variable": {
            "name": "play_or_pause_pressed",
            "value": 1
          }
        },
        {
          "set_variable": {
            "name": "play_or_pause_down",
            "value": 1
          }
        }
      ],
      "to_after_key_up": [
        {
          "conditions": [
            {
              "name": "play_or_pause_pending_fn",
              "type": "variable_if",
              "value": 1
            }
          ],
          "key_code": "fn"
        },
        {
          "set_variable": {
            "name": "play_or_pause_pending_fn",
            "value": 0
          }
        },
        {
          "set_variable": {
            "name": "play_or_pause_down",
            "value": 0
          }
        }
      ],
      "to_delayed_action": {
        "to_if_canceled": [
          {
            "set_variable": {
              "name": "play_or_pause_pressed",
              "value": 0
            }
          }
        ],
        "to_if_invoked": [
          {
            "conditions": [
              {
                "name": "play_or_pause_down",
                "type": "variable_if",
                "value": 0
              }
            ],
            "key_code": "fn"
          },
          {
            "conditions": [
              {
                "name": "play_or_pause_down",
                "type": "variable_if",
                "value": 1
              }
            ],
            "set_variable": {
              "name": "play_or_pause_pending_fn",
              "value": 1
            }
          },
          {
            "set_variable": {
              "name": "play_or_pause_pressed",
              "value": 0
            }
          }
        ]
      },
      "to_if_held_down": [
        {
          "key_code": "delete_or_backspace",
          "modifiers": [
            "left_command"
          ],
          "conditions": [
            {
              "type": "frontmost_application_unless",
              "bundle_identifiers": [
                "^com\\.apple\\.finder$"
              ]
            }
          ]
        },
        {
          "set_variable": {
            "name": "play_or_pause_pending_fn",
            "value": 0
          }
        }
      ],
      "type": "basic"
    }
  ]
}
```

## 单击、双击和长按如何区分

线控键的原始事件都是 `play_or_pause`，规则根据两次按下的间隔和按住时间决定输出。

| 输入过程 | 输出时机 |
| --- | --- |
| 按下后在 300 ms 内松开，期间没有第二次按下 | 第一次按下满 300 ms 时发送 `fn` |
| 按住超过 300 ms、不到 1 秒后松开 | 松开时发送 `fn` |
| 第一次按下后 300 ms 内再次按下 | 第二次按下时发送回车，取消第一次的延迟动作 |
| 按住满 1 秒 | 发送 `⌘⌫`；访达除外，松开后不再发送 `fn` |

前两种情况都要求等待期间没有其他按键打断。

三个变量分别记录：

- `play_or_pause_pressed`：是否仍处于第一次按下后的双击判定窗口。
- `play_or_pause_down`：按钮是否仍按着。
- `play_or_pause_pending_fn`：是否需要在松开按钮时补发 `fn`。

双击规则放在前面，是因为 Karabiner 从上到下匹配，只执行第一个命中的 manipulator。[规则匹配顺序](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-evaluation-priority/)

单击要等 300 ms，才能确认它不是双击。这个时间从按下开始计算；等待期间按下其他键，会取消延迟动作，因此单击后立即敲键盘可能不会触发语音输入。`basic.to_delayed_action_delay_milliseconds` 控制这段等待时间。[延迟动作说明](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to-delayed-action/)

`basic.to_if_held_down_threshold_milliseconds` 则控制长按阈值，当前是 1000 ms。长按触发后，规则清除 `play_or_pause_pending_fn`，避免松开按钮时又启动语音输入。[长按动作说明](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to-if-held-down/)

## 使用边界

### 语音输入方式要匹配

这份规则发送的是短按 `fn`，适合“按一下开始、再按一下结束”的输入方式。如果工具要求一直按住快捷键说话，应先切换到它支持的免按住模式，再调整规则中的快捷键。

Android 的 3.5mm 耳机规范将播放 / 暂停键定义为按下时麦克风端到地的等效阻抗为 0 Ω。由这种接法可推断，采用相同设计的耳机在按住按钮期间可能影响麦克风收音，具体表现仍需在设备上验证。因此，不宜把“按住线控键”直接当作持续收音的动作。[3.5mm 耳机规范](https://source.android.com/docs/core/interaction/accessories/headset/plug-headset-spec)

### 快捷键的含义由应用决定

在标准文本编辑行为中，`⌘⌫` 删除光标到当前行开头的内容，不能用它保证清空多行文本。终端、网页编辑器等应用还可能有自己的绑定。[Apple 文本删除接口](https://developer.apple.com/documentation/appkit/nsstandardkeybindingresponding/deletetobeginningofline(_:))

规则中的 `frontmost_application_unless` 仅阻止在访达中发送 `⌘⌫`。它不会检查其他应用的焦点，也不会保证回车只用于发送消息。先在空白文本框中验证，再确认常用应用中的实际效果。

### 规则的设备范围要明确

两个 manipulator 都通过 `device_unless` 排除了内置键盘，但没有限定耳机的设备标识。因此，其他已启用事件改写的外接设备，其 `play_or_pause` 也可能被映射。

如果只想影响某一副耳机，可改用 `device_if`，按 EventViewer 中的设备信息填写对应标识。[设备条件说明](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/device/)

规则生效后，匹配的播放 / 暂停事件不会继续传给播放器。想恢复原来的媒体控制，可以停用这条规则。

### 蓝牙和 USB-C 耳机需要单独确认

蓝牙耳机按键存在无法被 Karabiner 捕获的已知问题，AirPods 等设备不能直接按这份有线耳机配置推定兼容。[相关问题记录](https://github.com/pqrs-org/Karabiner-Elements/issues/2398)

USB-C 耳机和转接器也需要先用 EventViewer 检查。能否使用这套映射，取决于它们是否上报规则需要的按下、松开和持续按住事件。

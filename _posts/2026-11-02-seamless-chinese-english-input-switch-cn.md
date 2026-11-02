---
layout: post
title: 一种无感切换中英文输入法的方案
tags: [config]
---

在 Mac 上，中英文切换有两套常见操作：用 `Control + Space` 切换系统输入源，用 `Shift` 切换中文输入法内部的中英文模式。

麻烦在于，同样想从英文切到中文，按键却取决于当前状态。在中文输入法的英文模式下，按一下 `Shift` 就够了；如果当前输入源是 ABC，`Shift` 就没有这个作用，还得换用系统快捷键。

我希望把这两种情况统一起来：**平时留在中文输入法里，用左 Shift 切换中英文；偶尔回到 ABC 时，也能用同一个键切回中文输入法。**

借助 Karabiner-Elements，可以给 ABC 补上这一段行为。

## 输入英文，不一定要切到 ABC

先区分两个概念：

| 操作 | 改变的状态 | 例子 |
| --- | --- | --- |
| 切换输入源 | macOS 当前使用的输入源 | ABC → 豆包输入法 |
| 切换中英文模式 | 同一个输入法内部的输入模式 | 豆包输入法的中文模式 → 英文模式 |

`Control + Space` 默认选择上次使用的输入源，`Control + Option + Space` 选择下一个输入源。将 `fn` / 地球仪键设为“更改输入法”，做的也是输入源切换。[Apple 快捷键说明](https://support.apple.com/zh-cn/102650)

如果目的只是输入英文，很多中文输入法自带的英文模式就够用了。

保留中文输入法还有一个理由：它可能同时提供语音输入、跨设备复制粘贴等功能。例如，[豆包输入法](https://shurufa.doubao.com/pc)提供语音输入与跨端复制粘贴。对于依赖当前输入法激活的功能入口，留在它的英文模式里，可以减少为了调用功能而来回切换输入源的操作。具体功能在英文模式下是否可用，需要按所用输入法和版本确认。

因此，这个方案分成两部分：

- 已经在中文输入法里时，由输入法处理左 `Shift`，切换内部的中英文模式。
- 当前输入源是 ABC 时，由 Karabiner-Elements 处理左 `Shift`，激活指定的中文输入法。

Karabiner 只补齐第二部分。

## 准备输入法

安装 [Karabiner-Elements](https://karabiner-elements.pqrs.org/)，首次启动时按提示完成所需授权。

然后在中文输入法中开启“Shift 切换中英文”，并确认两件事：

1. 单独轻按左 `Shift`，可以在输入法内部切换中英文，菜单栏中的输入源仍然是这个中文输入法。
2. 从 ABC 切回这个输入法时，它会进入中文模式。若输入法提供“切入时默认中文”之类的选项，可以开启后验证。

第二点决定了能否做到“一次按键就开始打中文”。如果输入法会恢复先前的英文模式，下面的规则只能保证激活它，不能强制改变其内部模式。

## 确认输入源标识

打开随 Karabiner-Elements 安装的 **Karabiner-EventViewer**，进入 **Variables** 标签页。

分别切换到 ABC 和目标中文输入法，记录 `input_source` 中的 `input_source_id`。这里还能看到 `language` 和 `input_mode_id`。[官方查询说明](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/input-source/)

下面以这些标识为例，使用前应与自己电脑上的结果核对：

| 输入源 | `input_source_id` |
| --- | --- |
| ABC | `com.apple.keylayout.ABC` |
| 豆包输入法 | `com.bytedance.inputmethod.doubaoime.pinyin` |
| 微信输入法 | `com.tencent.inputmethod.wetype.pinyin` |

## 添加规则

打开 Karabiner-Elements 的 **Complex Modifications → Add your own rule**，用下面的完整规则对象替换编辑器中的示例并保存。[官方添加步骤](https://karabiner-elements.pqrs.org/docs/manual/configuration/add-your-own-complex-modifications/)

```json
{
  "description": "In ABC, tap left Shift to activate Doubao IME",
  "manipulators": [
    {
      "type": "basic",
      "conditions": [
        {
          "type": "input_source_if",
          "input_sources": [
            {
              "input_source_id": "^com\\.apple\\.keylayout\\.ABC$"
            }
          ]
        }
      ],
      "from": {
        "key_code": "left_shift",
        "modifiers": {
          "optional": ["any"]
        }
      },
      "to": [
        {
          "key_code": "left_shift",
          "lazy": true
        }
      ],
      "to_if_alone": [
        {
          "select_input_source": {
            "input_source_id": "^com\\.bytedance\\.inputmethod\\.doubaoime\\.pinyin$"
          }
        }
      ],
      "to_if_held_down": [
        {
          "key_code": "left_shift"
        }
      ],
      "parameters": {
        "basic.to_if_alone_timeout_milliseconds": 1000,
        "basic.to_if_held_down_threshold_milliseconds": 100
      }
    }
  ]
}
```

这是一条规则，不是完整的 `karabiner.json`。如果习惯直接编辑配置文件，应把它加入**当前启用的 profile** 的 `complex_modifications.rules` 数组。

使用微信输入法时，只需把 `select_input_source` 里的值替换为 `"^com\\.tencent\\.inputmethod\\.wetype\\.pinyin$"`，并相应修改 `description`。选定一个目标输入法即可，无需为两个输入法分别启用同样的触发规则。

这些标识按正则表达式匹配。`^` 和 `$` 限定完整标识，JSON 字符串中的 `\\.` 表示匹配字面量的点。如果使用的英文布局不是 ABC，也要相应替换条件里的标识。[输入源条件说明](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/input-source/)

## 规则如何工作

`input_source_if` 将规则限定在 ABC。进入中文输入法后，条件不再匹配，左 `Shift` 交回输入法处理。这里没有使用更宽泛的 `language: "en"`，以免规则也作用于其他英文输入源。

`to_if_alone` 在单独按下并松开左 `Shift` 时执行输入源切换。按住期间再敲其他键，会取消这次单独按键动作。配置中的 1000 ms 是单独按键的最长时限，不是切换前必须等待的时间。[单独按键说明](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to-if-alone/)

`lazy: true` 让单独轻按时不先发送一次普通的 Shift 事件；与其他键配合时，仍可作为 Shift 使用。`to_if_held_down` 则在按住 100 ms 后发出 Shift，兼顾需要单独按住修饰键的操作。[lazy 说明](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/lazy/)、[按住动作说明](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to-if-held-down/)

## 验证与适用范围

配置后，在普通文本框中逐项检查：

| 当前状态 | 操作 | 预期结果 |
| --- | --- | --- |
| ABC | 单独轻按左 `Shift` | 激活目标中文输入法，并按其设置进入中文模式 |
| 中文输入法的中文模式 | 单独轻按左 `Shift` | 进入同一输入法的英文模式 |
| 中文输入法的英文模式 | 单独轻按左 `Shift` | 回到同一输入法的中文模式 |
| ABC | 按住左 `Shift` 再输入字母 | 输入大写字母，不切换输入源 |
| ABC | 按住左 `Shift` 再按方向键 | 在支持的文本框中扩展选区，不切换输入源 |

如果依赖输入法的语音输入或跨设备复制粘贴，再在它的英文模式下检查这些功能。

Karabiner 官方提示，`select_input_source` 切换到带有 `input_mode_id` 的输入源时，可能因 macOS 的问题失败。不能仅凭输入法名称或“第三方输入法”这一分类判断兼容性，应结合 EventViewer 中的标识和实际切换结果确认。[输入源切换的限制](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to/select-input-source/)

这条规则没有改写 `Control + Space` 或 `fn`，它们仍可按原设置使用。代价是需要常驻 Karabiner-Elements，并依赖输入法自身的 Shift 行为和切入时的默认模式。需要恢复时，在 **Complex Modifications** 中移除这条规则即可。

# 連登包剪揼大賽

## 報名流程

1. 閱讀 [遊戲流程](#遊戲流程) 與 [賽制](#賽制-v10)
2. 使用 [連登包剪揼大賽工具小精靈](https://ngfhk.github.io/rps-1001/) 生成「拳策」
3. 張貼加密「拳策」至相關主題：
   1. 切勿自行插入會員加密
   2. 切勿移除```標記
   3. 切勿使用封測期間生成嘅「拳策」

## 遊戲流程

1. 開放收集報名，直至：
   1. 本主題爆po；或
   2. 主持人宣佈截止報名（會提前至少一小時宣佈）
2. 主持人於報名截止前，公佈報名資訊（合資格名單及參賽順序）
3. 報名以最後一次回覆為準
   1. 參賽順序亦會以最後一次回覆為準
4. 主持人按賽制主持比賽
5. 主持人公佈比賽結果，並將勝利者之「勝利宣言」公諸於世

## 賽制 v1.0

1. 單敗淘汰制
2. 出賽順序依報名次序排列
3. 遊戲人數不足 $2^n$ 時，將會於第一輪晉級首 $2^n - P$ 名報名嘅拳手：
   1. $P$ 為參賽人數；$n$ 為最小整數，使得 $2^n \ge P$
   2. 例子 1：$P = 9$，$n = 4$，$2^n = 16$，晉級前 $7$ 名拳手
   3. 例子 2：$P = 8$，$n = 3$，$2^n = 8$，無需特殊晉級
   4. 例子 3：$P = 1001$，$n = 10$，$2^n = 1024$，晉級前 $23$ 名拳手
4. 每局一鋪過
5. 如果出現「無限平手」情況，兩位拳手會被「合體」並同時晉級：
   1. 「循環選項」會以首先報名者為準
   2. 理論上如果所有人出拳策略相同，就會出現「全場合體」或「全世界冠軍」嘅情況
6. 拳手可以有限度地自訂出拳策略，詳見 [出拳策略(拳策)詳情](#出拳策略拳策詳情)

### 出拳策略(拳策)詳情

1. 不提供隨機出拳模式，強調人類自由意志，每拳都係由你親自決定
2. 拳手要提供「拳序」，例如 ✋ ✊ ✋：
   1. 限制：1-100「拳」
3. 考慮到有可能用完「拳序」，所以會提供以下循環選項：
   1. 窮盡後重頭開始；或
   2. 每盤重頭開始
4. 拳手可以自訂「拳策」私隱：
   1. 如選擇不公開，「拳策」將會保密
   2. 出拳**順序**無論如何都會被公開，以保證遊戲公平

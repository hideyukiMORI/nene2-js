# 日報 — `docs/daily/`

nene2-js（`@hideyukimori/nene2-client`）の**このリポ内の作業**の日次記録。フリート共通規約
`_work/daily-report-convention.md`（正本）に従う。

- 置き場・命名: `docs/daily/YYYY-MM-DD.md`（1日1ファイル。同日に複数セッションは同ファイル内 `## セッション2`）。
- 書式: `# YYYY-MM-DD` ＋ リード段落 ＋ `## トピック`（触った物・裏取り・残タスク、PR/Issue 番号必須）。数字は**実測か伝聞かを必ず書き分ける**〔実測〕〔伝聞〕。`## 📊 本日の数字` は任意。

## `_work/` との線引き

- **`docs/daily/`** = このリポ内の作業。
- **横断・戦略・複数リポにまたがる話・事業議論**は `/home/xi/docker/_work/`（`daily/`・`discussion-log/`）が正。日報には書かない。

## 索引（新しい順）

- [2026-07-18](2026-07-18.md) — 監査 A-3 止血: X-Authorization ミラーの文書化（#118）→ opt-out フラグ `mirrorAuthorizationHeader`（#120）。固有名除去（#119 相乗り）。
- [2026-07-17](2026-07-17.md) — W2b: `recoverAuth` seam（#108）→ 1.2.0 publish（#113）→ 移行ガイド（#110/#111/#114）→ invoice #685 レビュー承認。
- [2026-05-23](2026-05-23.md) — guard codegen 横展開 → 1.0.0 安定版リリース → ドキュメント整合性。

> 履歴メモ: 2026-05-23 の日報は旧 `docs/worklog/` から `git mv` で移設（PR #115・履歴保持）。

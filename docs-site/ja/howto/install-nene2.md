# NENE2 (PHP) を先に立ち上げる

知識ゼロから **TypeScript クライアントだけ** を入れても API は動きません。まず NENE2 JSON API を起動してください。

## 1. リポジトリを取得

```bash
cd /path/to/workspace
git clone https://github.com/hideyukiMORI/NENE2.git
cd NENE2
```

兄弟レイアウト（推奨）:

```text
../NENE2/
../nene2-js/    # このクライアント
../nene2-python/
```

## 2. 起動（例）

```bash
composer install
# プロジェクトの README / 公式ドキュメントに従い PHP サーバを起動
# 既定は http://localhost:8080
```

詳細は [NENE2 公式ドキュメント（日本語）](https://hideyukimori.github.io/NENE2/ja/) を参照。

## 3. ヘルス確認

```bash
curl -sS http://localhost:8080/health | jq .
# 期待: { "status": "ok", "service": "NENE2" }
```

## 4. 次のステップ

- [はじめに — npm クライアント](../tutorial/getting-started)
- [nene2-python を使う場合](install-nene2-python)
- [知識ゼロの全体像](../tutorial/blank-slate-journey)

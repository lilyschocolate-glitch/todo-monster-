# モバイルアプリ化（iOS/Android）実装計画

既存の Web ベースの「ToDo Monster」を、iOS および Android アプリとして動作させるための計画です。

## 技術選定
**Capacitor** を使用します。
- **理由**: 既存の Vite + Vanilla JS の構成をそのまま活かせ、保守が容易であるため。
- **メリット**: 一つのコードベースで Web, iOS, Android をサポートでき、将来的にプッシュ通知などのネイティブ機能も利用可能です。

## ユーザーへの確認事項
> [!IMPORTANT]
> iOS アプリの開発・ビルドには **macOS** と **Xcode** が必要です。Android アプリには **Android Studio** が必要です。

## 実施手順

### 1. Capacitor のインストール
```bash
npm install @capacitor/core @capacitor/cli
npx cap init todo-monster com.todomonster.app --web-dir dist
```

### 2. プラットフォームの追加
Android と iOS 用のプロジェクトディレクトリを生成します。
```bash
npm install @capacitor/android @capacitor/ios
npx cap add android
npx cap add ios
```

### 3. ビルドと同期
Web 資産をビルドし、各ネイティブプロジェクトにコピーします。
```bash
npm run build
npx cap copy
```

### 4. アイコン・スプラッシュ画面の設定
既存の `icon-512.png` 等を利用して、各 OS 用のアイコンを生成する設定を行います（別途 `cordova-res` 等の利用を検討）。

## 検証計画
### シミュレータによる確認
- Android Studio のエミュレータ、および Xcode のシミュレータでアプリが起動し、ログインやタスク追加ができることを確認します。
- 保存データ（localStorage）がアプリを閉じても保持されるか確認します。

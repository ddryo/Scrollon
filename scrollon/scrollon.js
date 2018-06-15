
/**
 * @overview 各スクロール値に達すれば「scon」というクラスを付与するスクリプトです。アニメーションの内容はCSSでコントロールしてください。
 * @author Ryo <LOOS WEB STUDIO>
 * @version 1.0.0
 * @license MIT
 */

/**
 *  @class このスクリプトの本体となるクラス
 */
class Scrollon {
    /**
     * @constructor Scrollonのコンストラクタ
     *     [変数の説明]
     *     winH       : windowの高さ
     *     winW       : windowの横幅
     *     itemsDOM : 対象要素のDOMを取得したもの
     *     itemY : 各要素のY座標を保存するための配列
     *     endCount   : クラスを追加し終わった要素の数
     *     timeoutId :setTimeoutの待機中かどうかを判定
     */

    /* Start Constrructor */
    constructor(items = "", options = {}) {

        try {
            if (typeof items !== 'string') {
                //itemが文字列じゃないとき
                throw new Error('First argument is not `string`.');
            }

            if (!items) {
                //itemが空の時
                items = ".scon_item";
            }

            this.winH = window.innerHeight;
            this.winW = screen.width;
            this.itemsDOM = document.querySelectorAll(items);
            this.itemY = [];
            this.endCount = 0;
            this.timeoutId = 0;

            // オプションの初期設定と引数での上書き
            let {
                addClassName = "scon",
                offset = 0,
                interval = 50,
            } = options;

            // 生成されたオプションのセット
            this.options = {
                addClassName,
                offset,
                interval
            }

            // 関数呼び出し
            /* this._LogTest(); */
            this._SetItemsY();
            this._DoScrollOn();
            this._bindEvents();

        } catch (e) {

            console.log(e.name + ': ' + e.message);

        }

    }
    /* End Constrructor */

    /**
     * @function　開発時のlogテスト用
     */
    _LogTest() {
        console.log(this.itemsDOM);
        console.log(this.options);
    }

    /**
     * @function　各要素のY座標を取得して配列に保存する関数
     *     rect.top(現在のスクロール位置からの絶対座標) + window.pageYOffset(現在のスクロール位置)がドキュメントからのY座標
     */
    _SetItemsY() {
        // 初期化
        this.itemY = [];
        let itemsLen = this.itemsDOM.length;
        for (let i = 0; i < itemsLen; i++) {
            let item = this.itemsDOM[i];
            let rect = item.getBoundingClientRect();
            this.itemY.push(rect.top + window.pageYOffset);
        }
    }

    /**
     * @function 各要素のy座標と現在のスクロール値を比較し、クラス（'scon'）を付与する関数。
     *     負担軽減のため、setTimeoutを使用して指定した間隔でしか発動しないようにしている。
     *     scThreshold : 各要素のrect.topと比較する値。
     */

    _DoScrollOn() {

        if (this.timeoutId) return;

        this.timeoutId = setTimeout(() => {

            this.timeoutId = 0;

            let scThreshold = window.pageYOffset + this.winH - this.options.offset;

            for (let i = this.endCount; i < this.itemY.length; i++) {
                if (this.itemY[i] < scThreshold) {
                    this.itemsDOM[i].classList.add(this.options.addClassName);
                    this.endCount++;
                }
            }

        }, this.options.interval);
    }

    /**
     * @function 処理関数をイベントへ登録する関数。
     *     load時に再度itemsYをセット（ready時は値にずれがあるかもしれないので）
     *     scroll時にクラス付与関数を呼び出す。
     */

    _bindEvents() {
        if (window.addEventListener) {
            window.addEventListener('load', () => {
                this._SetItemsY();
            });
            window.addEventListener("scroll", () => {
                this._DoScrollOn();
            });
        } else {
            window.attachEvent('onload', () => {
                this._SetItemsY();
            });
            window.attachEvent("onscroll", () => {
                this._DoScrollOn();
            });
        }
    }
}
/* End Class: Scrollon */

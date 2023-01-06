// 必須パッケージのインポート
const { Connection, ProgramCall } = require('itoolkit');
const { XMLParser } = require('fast-xml-parser');

// ODBC接続確立
const conn = new Connection({
    transport: 'odbc',
    transportOptions: { dsn: '*LOCAL'}
});

// サービスプログラムの呼び出し
const program = new ProgramCall('USC_NODE01', { lib: 'USHIDA' });

// 引数（入力／出力）設定
let msg_in = 'うしださん';
let msg_ot = '';
program.addParam({ name: 'msg_in', type: '256A', io: 'both' ,value: msg_in});
program.addParam({ name: 'msg_ot', type: '256A', io: 'both' ,value: msg_ot});

// プログラムを登録
conn.add(program);

// プログラムを実行
conn.run((error, xmlOutput) => {
    if (error) {
      throw error;
    }

    // XMLで出力する場合
    // console.log(xmlOutput);

    // XMLをJSONに変換
    const XmlToJsonParser = new XMLParser();
    const result = XmlToJsonParser.parse(xmlOutput);

    // パラメータの値のみ取り出す
    const retParams = result.myscript.pgm.parm.map((parm) => parm.data )
    const [msg_in,msg_ot] = retParams

    // 返り値を出力
    console.log(msg_ot);
});
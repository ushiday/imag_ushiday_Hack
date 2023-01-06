// 必須パッケージのインポート
const { Connection, ProgramCall } = require('itoolkit');
const { XMLParser } = require('fast-xml-parser');

// ODBC接続確立
const conn = new Connection({
    transport: 'odbc',
    transportOptions: { dsn: '*LOCAL'}
});

// サービスプログラムの呼び出し
const program = new ProgramCall('QC2UTIL2', { lib: 'QSYS', func: 'cos' });

// 引数（入力）設定
program.addParam({ name: 'angle', type: '8f', value: '0', by: 'val' });         //expect... Angle input: 0 Cosine result: 1
// program.addParam({ name: 'angle', type: '8f', value: '3.14159', by: 'val' });    //expect... Angle input: 0 Cosine result: -1

// 引数（出力）設定
program.addReturn({ name: 'cos', type: '8f', value: '' });

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

    // 返り値を出力
    console.log('Angle input: ' + result.myscript.pgm.parm.data + ' Cosine result: ' + result.myscript.pgm.return.data);
});
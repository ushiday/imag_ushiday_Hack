// 必須パッケージのインポート
const { Connection, CommandCall } = require('itoolkit');
const { XMLParser } = require('fast-xml-parser');

// ODBC接続確立
const conn = new Connection({
    transport: 'odbc',
    transportOptions: { dsn: '*LOCAL'}
});

// コマンドの呼び出し
const command = new CommandCall({ type: 'cl', command: 'RTVJOBA USRLIBL(?) SYSLIBL(?)' });

conn.add(command);

conn.run((error, xmlOutput) => {
    if (error) {
      throw error;
    }

    // XMLで出力する場合
    // console.log(xmlOutput);

    // XMLをJSONに変換
    const XmlToJsonParser = new XMLParser();
    const result = XmlToJsonParser.parse(xmlOutput);

    const [usrlibl,syslibl] = result.myscript.cmd.row;

    // 返り値を出力
    console.log('SYSLIBL :', syslibl.data);
    console.log('USRLIBL :',usrlibl.data );

});
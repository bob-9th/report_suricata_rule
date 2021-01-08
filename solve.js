const URL = [
	["test.gilgil.net"],
	"www.naver.com",
	"www.google.com",
	"github.com",
	"nlog.dev",
	"t.me",
	"www.youtube.com",
	"www.acmicpc.net",
	"codeforces.com",
	"www.office.com",
	"koi.or.kr",
	"codeup.kr",
	"www.kitribob.kr",
	"nnnlog.tistory.com",
	"cloud.mongodb.com",
	"www.ebsi.co.kr",
	"tcpschool.com",
	"atcoder.jp",
	"gitlab.com",
	"solved.ac"
];
let ret = "";
for (let i = 0; i < URL.length; i++) {
	let url = URL[i];
	if (typeof url === "object") 
		ret += `alert tcp any any -> any 80 (msg:"HTTP ${url[0]} access"; content:"GET /"; content:"Host: ";content:"${url[0]}"; sid:${10000 + i}; rev:1;)\n`;
	else ret += `alert tcp any any -> any 443 (msg:"HTTPS ${url} access"; tls.sni; content:"${url}"; nocase; sid: ${10000 + i}; rev:1;)\n`;
}
const fs = require("fs");
fs.writeFileSync("test.rules", ret);
const {exec, execSync} = require("child_process");
//exec("suricata -s test.rules -i ens33", (err, ret) => {
//	console.log(err, ret);
//});
for (let url of URL) {
	if (typeof url === "string") url = `https://${url}/`;
	else url = `http://${url[0]}/`;
	execSync(`curl ${url}`, {stdio: 'ignore'});
	console.log(`Request ${url}`);
}


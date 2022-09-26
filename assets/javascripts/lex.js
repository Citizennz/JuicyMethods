let types = [
	"int64_t\\[\\]",	"int64_t",
	"uint64_t\\[\\]", 	"uint64_t",
	"size_t\\[\\]",		"size_t",
	"int32_t\\[\\]",	"int32_t",
	"uint32_t\\[\\]",	"uint32_t",
	"int16_t\\[\\]",	"int16_t",
	"uint16_t\\[\\]",	"uint16_t",
	"int8_t\\[\\]",		"int8_t",
	"uint8_t\\[\\]",	"uint8_t",
	"BYTE\\[\\]",		"BYTE",
	"const char\\*",

	"void",
	"nil",
	"\\*",
	"\\[\\.\\.\\.\\]",

	"Feat\\[\\]",		"Feat",
	"PlayerFeat\\[\\]",	"PlayerFeat",
	"string\\[\\]",		"string",
	"function\\[\\]",	"function",
	"integer\\[\\]",	"integer",
	"boolean\\[\\]",	"boolean",
	"bool\\[\\]",		"bool",
	"int\\[\\]",		"int",
	"float\\[\\]",		"float",
	"number\\[\\]",		"number",
	"Thread\\[\\]",		"Thread",
	"Player\\[\\]",		"Player",
	"Entity\\[\\]",		"Entity",
	"Ped\\[\\]",		"Ped",
	"Vehicle\\[\\]",	"Vehicle",
	"Object\\[\\]",		"Object",
	"Group\\[\\]",		"Group",
	"Hash\\[\\]",		"Hash",
	"Ptfx\\[\\]",		"Ptfx",
	"Blip\\[\\]",		"Blip",
	"Pickup\\[\\]",		"Pickup",
	"Any\\[\\]",		"Any",

	"RegexResult",
	"Regex",
	"v2",
	"v3",
	"NativeResult",
	"ByteBuffer256",
	"ByteBuffer128",
	"ByteBuffer64",
	"ByteBuffer32",
	"ByteBuffer16",
	"ByteBuffer8",
];

window.addEventListener('load', e => {
	if(document.getElementById("2Take1Menu-Lua-API") == null){
		return;
	}

	console.log("Hi, I'm lex");
	let tj = types.join("|");

	let pat_types = new RegExp("(^|[^A-Za-z0-9_>])(" + tj + ")", "g");
	let pat_args = /\((.*)\)/;
	let pat_arg = new RegExp("(" + tj + ")\\\s+([^,)]+)", "g");

	let fndefs = document.querySelectorAll('h4 > code');
	for(let i = 0; i < fndefs.length; i++){
		let content = fndefs[i].innerHTML;
		let matches;
		let args;

		matches = pat_args.exec(content);

		if(matches == null || matches.length < 2){
			continue;
		}

		args = matches[1];
		args = args.replace(pat_arg, `$1 <span class="o">$2</span>`);

		fndefs[i].classList.add("highlight");
		content = content.replace(pat_args, "(" + args + ")");
		content = content.replace(pat_types, `$1<span class="kr">$2</span>`);
		fndefs[i].innerHTML = content;
	}

	let structdefs = document.querySelectorAll('td > code');
	for(let i = 0; i < structdefs.length; i++){
		let content = structdefs[i].innerHTML;
		let matches;

		matches = pat_args.exec(content);

		if(matches != null && matches.length > 0){
			let args = matches[1];
			args = args.replace(pat_arg, `$1 <span class="o">$2</span>`);
			args = args.replace(pat_types, `$1<span class="kr">$2</span>`);
			content = content.replace(pat_args, "(" + args + ")");
		} else {
			content = content.replace(pat_types, `$1<span class="kr">$2</span>`);
		}
		structdefs[i].classList.add("highlight");
		structdefs[i].innerHTML = content;
	}
})
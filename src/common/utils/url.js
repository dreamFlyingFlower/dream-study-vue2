/**
 * url进行中文编码
 */
export default class URL{
	static encodeUri(url){
		return encodeURIComponent(url);
	}
	
	static decodeUri(url){
		return decodeURIComponent(url);
	}
}

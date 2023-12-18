// export default function copyText(id: string) {
export default function copyText(textArr: string[]) {
    navigator.clipboard.writeText(textArr.join(' && '));

    alert("Text copied");

}
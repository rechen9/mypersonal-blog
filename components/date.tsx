import { parseISO, format } from "date-fns";
//parseISO：用于将ISO 8601格式的字符串解析为JavaScript的Date对象。
//format：用于将Date对象格式化为指定的字符串格式。

// 定义组件的 props 接口
interface DateProps {
    dateString: string;
  }

export default function Date({dateString}: DateProps){
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date,"LLLL d, yyyy")}</time>
}
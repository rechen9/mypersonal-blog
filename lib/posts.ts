import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from 'remark'
import html from 'remark-html'

interface PostData {
    id: string;
    title: string;
    date: string;
}

//确定目录
const postsDirectory = path.join(process.cwd(),"posts")

//一个模块只能由一个默认导出
export default function getSortPostData(): PostData[]{
    //获取目录下所有md文件
    const fileNames = fs.readdirSync(postsDirectory)
    //遍历目录下所有md文件
    //map 方法会遍历 fileNames 数组中的每个文件名，并对每个文件名执行提供的回调函数。
    const allPostsData = fileNames.map(fileName =>{
        //正则表达式去除.md
        const id = fileName.replace(/\.md$/, '')
        //拼接完整的文件路径
        const fullPath = path.join(postsDirectory,fileName)
        //同步读取文件内容
        const fileContenes = fs.readFileSync(fullPath,"utf-8")
        //使用gray-matter解析Markdown文件的Front Matter，返回一个对象，其中matterResult.data包含文章的元数据。
        const matterResult = matter(fileContenes)
        return{
            id,
            ...(matterResult.data as { title: string; date: string }),
        }
    })
    return allPostsData.sort((a,b) => {
        if (a.date < b.date){
        return -1
    }else{
        return 1
    }
})
}

export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory)
    //导出的样式
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName =>{
        return {
            params:{
             id : fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id:string){
    const fullPath = path.join(postsDirectory,`${id}.md`)
    const fileContenes = fs.readFileSync(fullPath,'utf-8')
    const matterResult = matter(fileContenes)

    //利用remark将markdown转为HTML
    //matterResult.content是实际内容
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return{
        id,
        contentHtml,
        ...matterResult.data
    }
}
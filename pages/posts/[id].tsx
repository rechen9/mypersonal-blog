import Layout from "@/components/layout";
import { getAllPostIds , getPostData } from "@/lib/posts";
import Head from "next/head";
import Date from "@/components/date";
import utils from "@/styles/utils.module.css"

export default function Post({postData}){
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
            <h1 className={`${utils.headingXl} ${utils.contentcenter}`}>{postData.title}</h1>
            <div className={utils.contentcenter}>
            <Date dateString={postData.date}/>
            </div>
            <br />
            <div dangerouslySetInnerHTML={{__html : postData.contentHtml}}/>
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        //不存在的将返回404页面
        fallback:false
    }
}

export async function getStaticProps({params}){
    const postData = await getPostData(params.id)
    return {
        props : {
            postData
        }
    }
}
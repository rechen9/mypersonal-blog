import Layout from "@/components/layout";
import { getAllPostIds , getPostData } from "@/lib/posts";
import Head from "next/head";
import Date from "@/components/date";
import utils from "@/styles/utils.module.css"

interface PostData {
    id: string;
    title: string;
    date: string;
    contentHtml: string;
  }
  
  interface PostProps {
    postData: PostData; // postData 是一个包含文章数据的对象
  }

interface Params{
    id : string;
}

export default function Post({postData}:PostProps){
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

//params 是 context 的一部分：在 getStaticProps 和 getServerSideProps 中，params 是 context 对象中的一个属性。它提供了与动态路由相关的参数值。
export async function getStaticProps(context: { params: Params }){
    const params = context.params;
    const postData = await getPostData(params.id)
    return {
        props : {
            postData
        }
    }
}
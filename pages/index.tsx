import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/layout";
import { siteTitle } from "@/components/layout";
import utils from "../styles/utils.module.css"
import get from "../lib/posts"
import Date from "@/components/date";

export default function Home({allPostsData}){
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utils.headingMd}>
      <p className={utils.indexintroudction}>[Hello,我是ReChen,这是我的博客]</p>
      <p>
      该博客主要用于记录前端学习过程的学习进度
      <br />
      next.js学习详情请查看--<a href="https://www.nextjs.cn/docs/getting-started">our Next.js tutorial</a>
      </p>
      </section>
      <section className={`${utils.headingMd} ${utils.padding1px}`}>
        <h2 className={utils.headingLg}>博客目录</h2>
        <ul className={utils.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utils.listItem} key={id}>
              {id}. <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utils.lightText}>
              <Date dateString={date}/>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

//fs必须在getStaticProps()中调用
export async function getStaticProps(){
  const allPostsData = get()
  return {
    props : {
      allPostsData
    }
  }
}
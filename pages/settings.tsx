import React from 'react';
import NextLink from 'next/link';

type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Settings(props: { posts: Posts[] }) {
  const { posts } = props;
  return (
    <div>
      <NextLink href="/">
        <a className="nav_heading">Go Back to Home</a>
      </NextLink>
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '0.5em',
        }}
      >
        All Posts
      </h1>
      <div className="container">
        <div className="table">
          <div className="table-header">
            <div className="header__item">
              <a id="name" className="post_header" href="#">
                Title
              </a>
            </div>
            <div className="header__item">
              <a id="wins" className="post_header post_header--number" href="#">
                Body
              </a>
            </div>
          </div>
          <div className="table-content">
            {posts.map((post: Posts) => {
              return (
                <>
                  <div className="table-row">
                    <div className="table-data">{post.title}</div>
                    <div className="table-data">{post.body}</div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return { props: { posts: data } };
}
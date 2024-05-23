import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { getData } from '../../api/dummyapi';

import PostCard from '../../components/PostCard';

const PostTag = ({ tag }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const data = await getData(`tag/${tag}/post`, { page, limit });
        //console.log(data);
        setPosts(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, limit, tag]);


  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',

        gap: '15px',
        width: '100%'
      }}
    >
      {loading &&
        (<Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 24,
              }}
              spin
            />
          }
        />)}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
};
export default PostTag;

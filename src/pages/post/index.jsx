/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Spin, Card, Avatar, Skeleton, Tag } from 'antd';
import { LoadingOutlined, LikeOutlined } from '@ant-design/icons';

import { getData } from '../../api/dummyapi';

import PostTag from '../../components/Tag';
import Comments from '../../components/Comments';

const { Meta } = Card;

const Post = ({ postId }) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const post = await getData(`post/${postId}`);
        setPost(post);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />
        }
      />
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',

        width: '100%',
        height: '100%',
      }}
    >
      <Card
        bordered={false}
        style={{
          width: 700,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',

            width: '100%',
            height: '100%',
          }}>
          <div style={{ width: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!imageLoaded && <Skeleton.Image active style={{ width: '100%', height: '100%' }} />}
            <img
              alt="Post cover"
              src={post.image}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'bottom center',
                display: imageLoaded ? 'block' : 'none',
              }}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div
            style={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
              alignItems: 'flex-start',

              margin: '10px',
            }}
          >

            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              <Meta
                title={`${post.owner.title}. ${post.owner.firstName} ${post.owner.lastName}`}
                avatar={<Avatar src={post.owner.picture} />}
              />
              <Tag
                style={{ padding: '5px' }}
                icon={<LikeOutlined style={{ fontSize: '16px', color: '#08c' }} />}
              >
                {post.likes}
              </Tag>
            </div>

            <div style={{ width: '100%' }}>
              <p style={{ textAlign: 'left', marginBottom: 0 }}>{post.text}</p>
              <p style={{ textAlign: 'right', marginTop: 0, fontSize: '10px', color: '#888888' }}>
                {new Date(post.publishDate).toLocaleDateString()}
              </p>
            </div>

            <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
              {post.tags.map((tag, index) => (
                <PostTag key={index}>{tag}</PostTag>
              ))}
            </div>

            <Comments postId={postId} />
          </div>
        </div>
      </Card>
    </div>
  )
};

export default Post;

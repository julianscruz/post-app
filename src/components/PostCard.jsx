import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Skeleton, Badge, Avatar } from 'antd';
import { LikeFilled } from '@ant-design/icons';
import { Link } from 'wouter';

import PostTag from './Tag';

const { Meta } = Card;

const PostCard = ({ post }) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<Link href={`/post/${post.id}`}>
			<Card
				hoverable
				style={{ width: 250, height: 'auto', marginBottom: 16 }}
				cover={
					<div style={{ height: 240, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
				}
				actions={[
					<div key="tags" style={{ display: 'flex', gap: '5px' }}>
						{post.tags.map((tag, index) => (
							<PostTag key={index}>{tag}</PostTag>
						))}
					</div>
				]}
			>
				<Meta
					title={`${post.owner.title}. ${post.owner.firstName} ${post.owner.lastName}`}
					avatar={<Avatar src={post.owner.picture} />}
				/>
				<div style={{ marginTop: 16 }}>
					<p><strong>{post.text}</strong></p>
					<div
						style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
					>
						<Badge
							key="message"
							size="small"
							offset={[20, 0]}
							count={post.likes}
							style={{ backgroundColor: '#52c41a' }}
						>
							<LikeFilled style={{ fontSize: '16px', color: '#08c' }} />
						</Badge>
						<p>{new Date(post.publishDate).toLocaleDateString()}</p>
					</div>
				</div>
			</Card>
		</Link>
	);
};

PostCard.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		likes: PropTypes.number.isRequired,
		publishDate: PropTypes.string.isRequired,
		owner: PropTypes.shape({
			title: PropTypes.string.isRequired,
			firstName: PropTypes.string.isRequired,
			lastName: PropTypes.string.isRequired,
			picture: PropTypes.string.isRequired,
		}).isRequired,
		tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	}).isRequired,
};

export default PostCard;

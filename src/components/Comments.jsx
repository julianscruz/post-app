/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Spin, Avatar, List } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { getData } from '../api/dummyapi';

const Comments = ({ postId }) => {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const comments = await getData(`post/${postId}/comment`);
				setComments(comments.data);
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
		<List
			itemLayout="horizontal"
			size="large"
			dataSource={comments}
			style={{
				width: '100%',
				textAlign: 'left',
				marginTop: '20px',
			}}
			renderItem={(item) => (
				<List.Item
					key={item.message}
				>
					<List.Item.Meta
						avatar={<Avatar src={item.owner.picture} />}
						title={<a href=''>{`${item.owner.title}. ${item.owner.firstName} ${item.owner.lastName}`}</a>}
						description={item.message}
					/>
				</List.Item>
			)}
		/>
	)
};
export default Comments;

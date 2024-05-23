/* eslint-disable react/prop-types */
import { Tag } from 'antd';
import { Link } from 'wouter';

const PostTag = ({ children }) => {
	return (
		<Link href={`/tag/${children}`}>
				<Tag>{children}</Tag>
		</Link>
	);
};

export default PostTag;
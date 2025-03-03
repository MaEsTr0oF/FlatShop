import { useEffect, useState, useCallback, memo } from 'react';
import styles from './TreePartners.module.css';
import UserCard from './UserCard/UserCard';
import { ConnectionLines } from './ConnectionLines/ConnectionLines';

interface Partner {
	id: string;
	name: string;
	role: string;
	userId: string;
	partnersCount: number;
	avatar?: string;
	children?: Partner[];
}

interface NodeRefs {
	[key: string]: HTMLDivElement | null;
}

interface ParentChildMapping {
	[key: string]: string[];
}

const mockData: Partner = {
	id: '1',
	name: 'Константин Константинопольский',
	role: 'Младший Тренер',
	userId: '000 000 002',
	partnersCount: 14,
	children: [
		{
			id: '2',
			name: 'Константин Константинопольский',
			role: 'Младший Тренер',
			userId: '000 000 002',
			partnersCount: 15,
			children: [
				{
					id: '5',
					name: 'Константин Константинопольский',
					role: 'Младший Тренер',
					userId: '000 000 002',
					partnersCount: 16,
				},
				{
					id: '6',
					name: 'Константин Константинопольский',
					role: 'Младший Тренер',
					userId: '000 000 002',
					partnersCount: 18,
				}
			]
		},
		{
			id: '3',
			name: 'Константин Константинопольский',
			role: 'Младший Тренер',
			userId: '000 000 002',
			partnersCount: 13,
			children: [
				{
					id: '7',
					name: 'Константин Константинопольский',
					role: 'Младший Тренер',
					userId: '000 000 002',
					partnersCount: 12,
				}
			]
		},
		{
			id: '4',
			name: 'Константин Константинопольский',
			role: 'Младший Тренер',
			userId: '000 000 002',
			partnersCount: 11,
		}
	]
};

const TreeNode = memo(({ 
	data, 
	level = 0,
	nodeRefs,
}: { 
	data: Partner; 
	level?: number;
	nodeRefs: (id: string, element: HTMLDivElement | null) => void;
}) => {
	const hasChildren = data.children && data.children.length > 0;
	
	const refCallback = useCallback((element: HTMLDivElement | null) => {
		nodeRefs(data.id, element);
	}, [data.id, nodeRefs]);
	
	return (
		<div 
			className={styles.node} 
			ref={refCallback}
		>
			<UserCard
				name={data.name}
				role={data.role}
				userId={data.userId}
				partnersCount={data.partnersCount}
				avatar={data.avatar}
				isActive={level === 0}
			/>
			{hasChildren && (
				<div className={styles.children}>
					{data.children?.map((child) => (
						<TreeNode 
							key={child.id} 
							data={child} 
							level={level + 1}
							nodeRefs={nodeRefs}
						/>
					))}
				</div>
			)}
		</div>
	);
});

const createParentChildMapping = (data: Partner): ParentChildMapping => {
	const mapping: ParentChildMapping = {};
	
	const traverse = (node: Partner) => {
		if (node.children && node.children.length > 0) {
			mapping[node.id] = node.children.map(child => child.id);
			node.children.forEach(traverse);
		}
	};
	
	traverse(data);
	return mapping;
};

export default function TreePartners() {
	const [nodeRefs, setNodeRefs] = useState<NodeRefs>({});
	const [parentChildMapping, setParentChildMapping] = useState<ParentChildMapping>({});

	useEffect(() => {
		setParentChildMapping(createParentChildMapping(mockData));
	}, []);

	const updateNodeRef = useCallback((id: string, element: HTMLDivElement | null) => {
		setNodeRefs(prev => {
			// Если значение не изменилось, возвращаем предыдущий объект
			if (prev[id] === element) {
				return prev;
			}
			return {
				...prev,
				[id]: element
			};
		});
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>ВАША СТРУКТУРА</h1>
			<div className={styles.treeWrapper}>
				<div className={styles.tree}>
					<TreeNode 
						data={mockData} 
						nodeRefs={updateNodeRef}
					/>
					<ConnectionLines 
						nodeRefs={nodeRefs}
						parentChildMapping={parentChildMapping}
					/>
				</div>
			</div>
		</div>
	);
}

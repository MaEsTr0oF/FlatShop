import styles from './Partner.module.css'
import Teammate from './Teammate/Teammate'
import Structure from './Structure/Structure'
import TreePartners from './TreePartners/TreePartners'
export default function Partner() {
	return (
		<div className={styles.container}>
			<Structure />
			<Teammate />
			<TreePartners />
		</div>
	)
}

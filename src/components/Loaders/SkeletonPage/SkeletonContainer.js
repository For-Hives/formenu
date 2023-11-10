import SkeletonNav from '@/components/Loaders/SkeletonComponent/SkeletonNav'
import SkeletonList from '@/components/Loaders/SkeletonComponent/SkeletonList'

export function SkeletonContainer() {
	return (
		<>
			<SkeletonNav />
			<SkeletonList />
		</>
	)
}

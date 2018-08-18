export interface OwnState {}

export interface OwnProps {
    title: string
    items: Array<{
		key: string
		value: any
	}>
    value: string
    onValueChange: (value: any) => void
}
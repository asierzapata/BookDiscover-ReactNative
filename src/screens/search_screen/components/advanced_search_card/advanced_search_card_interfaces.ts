export interface ownState {}

export interface ownProps {
    title: string
    items: {
        [key: string]: string
    }
    value: string
    onValueChange: (value: any) => void
}
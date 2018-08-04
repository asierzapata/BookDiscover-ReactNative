// import React, { Component } from 'react';
// import { View, Dimensions, ViewPropTypes, FlatList, StyleProp, ViewStyle } from 'react-native';

// class GridView extends Component<ownProps, ownState> {

//     componentDidMount() {
//         this.setState(this.getDimensions())
//     }

//     componentWillReceiveProps(nextProps: ownProps) {
//         if (nextProps.itemDimension !== this.props.itemDimension) {
//             this.setState({
//                 ...this.getDimensions(this.state.totalDimension, nextProps.itemDimension),
//             });
//         }
//     }

//     onLayout(e: any) {
//         const { staticDimension, horizontal, onLayout } = this.props;
//         if (!staticDimension) {
//             const { width = 0 , height = 0 } = e.nativeEvent.layout || {};

//             this.setState({
//                 ...this.getDimensions(horizontal ? height : width),
//             });
//         }
//         // run onLayout callback if provided
//         if (onLayout) {
//             onLayout(e);
//         }
//     }

//     getDimensions(lvDimension?: number, itemDim?: number) {
//         const { itemWidth, spacing, fixed, staticDimension, horizontal } = this.props;
//         let itemDimension = itemDim || this.props.itemDimension;
//         if (itemWidth) {
//             itemDimension = itemWidth;
//         }

//         const dimension = horizontal ? 'height' : 'width';
//         const totalDimension = lvDimension || staticDimension || Dimensions.get('window')[dimension];
//         const itemTotalDimension = itemDimension! + spacing!;
//         const availableDimension = totalDimension - spacing!; // One spacing extra
//         const itemsPerRow = Math.floor(availableDimension / itemTotalDimension);
//         const containerDimension = availableDimension / itemsPerRow;

//         return {
//             totalDimension,
//             itemDimension,
//             spacing,
//             itemsPerRow,
//             containerDimension,
//             fixed,
//         };
//     }

//     renderVerticalRow(data: Data) {
//         const { itemDimension, spacing, containerDimension, fixed, itemsPerRow } = this.state;
//         const rowStyle = {
//             flexDirection: 'column',
//             paddingTop: spacing,
//             paddingRight: spacing,
//         } as { [key: string] : any };
//         if (data.isLast) {
//             rowStyle.marginRight = spacing;
//         }
//         const itemContainerStyle = {
//             justifyContent: 'center',
//             height: containerDimension,
//             paddingBottom: spacing,
//             ...this.props.itemContainerStyle
//         };
//         let itemStyle = {};
//         if (fixed) {
//             itemStyle = {
//             height: itemDimension,
//             justifyContent: 'center',
//             };
//             delete itemContainerStyle.paddingBottom;
//         }

//         return (
//             <View style={rowStyle}>
//                 {(data || []).map((item, i) => (
//                 <View key={`${data.key}_${i}`} style={itemContainerStyle}>
//                     <View style={itemStyle}>
//                     {this.props.renderItem(item, i + (data.rowNumber * itemsPerRow))}
//                     </View>
//                 </View>
//                 ))}
//             </View>
//         );
//     }

//     renderHorizontalRow(data: Data[]) {
//         const { itemDimension, containerDimension, spacing, fixed, itemsPerRow } = this.state;
//         const rowStyle = {
//             flexDirection: 'row',
//             paddingLeft: spacing,
//             paddingBottom: spacing,
//         } as { [key: string] : any };
//         if (data.isLast) {
//             rowStyle.marginBottom = spacing;
//         }
//         const itemContainerStyle = {
//             flexDirection: 'column',
//             justifyContent: 'center',
//             width: containerDimension,
//             paddingRight: spacing,
//             ...this.props.itemContainerStyle
//         };
//         let itemStyle = {};
//         if (fixed) {
//             itemStyle = {
//                 width: itemDimension,
//                 alignSelf: 'center',
//             };
//         }
    
//         return (
//             <View style={rowStyle}>
//                 {(data || []).map((item: any, i: number) => (
//                 <View key={`${data.key}_${i}`} style={itemContainerStyle}>
//                     <View style={itemStyle}>
//                     {this.props.renderItem(item, i + (data.rowNumber * itemsPerRow))}
//                     </View>
//                 </View>
//                 ))}
//             </View>
//         );
//     }

//     renderRow({ item }: { item: Data }) { // item is array of items which go in one row
//         const { horizontal } = this.props;
//         if (horizontal) {
//             return this.renderVerticalRow(item);
//         }
//         return this.renderHorizontalRow(item);
//     }

//     render() {
//         const { items, style, spacing, fixed, itemDimension, renderItem,
//             horizontal, onLayout, ...props } = this.props;
//         const { itemsPerRow } = this.state;
    
//         const chunked = chunkArray(items, itemsPerRow); //Splitting the data into rows
    
//         //Adding metadata to these rows
//         const rows = chunked.map((r: any[], i: number) => {
//             const keydRow = [...r] as { [key: string] : any };
//             keydRow.key = `row_${i}`;
//             keydRow.rowNumber = i; //Assigning a row number to each row to allow proper indexing later
//             keydRow.isLast = (chunked.length - 1 === i);
//             return keydRow as Data[];
//         });
    
//         return (
//             <FlatList
//                 data={rows}
//                 renderItem={this.renderRow}
//                 style={[
//                     { ...horizontal ? { paddingLeft: spacing } : { paddingTop: spacing } },
//                     style,
//                 ]}
//                 onLayout={this.onLayout}
//                 {...props}
//                 horizontal={horizontal}
//             />
//         );
//     }

// }

// export interface ownState {
//     totalDimension: number,
//     itemDimension?: number,
//     spacing?: number,
//     itemsPerRow: number,
//     containerDimension: number,
//     fixed?: boolean,
// }

// export interface ownProps {
//     renderItem: (item: any, index: number) => JSX.Element,
//     items: any[],
//     itemDimension?: number,
//     itemWidth?: number,
//     fixed?: boolean,
//     spacing?: number,
//     style?: StyleProp<ViewStyle>,
//     itemContainerStyle?: StyleProp<ViewStyle>,
//     staticDimension?: number,
//     horizontal?: boolean,
//     onLayout?: (e: any) => void,
// }

// interface Data {
//     key: string,
//     rowNumber: number,
//     isLast: boolean
// }

// function chunkArray(array: any, size: number) {
//     if (array == []) return [];
//     return array.reduce((acc: any[], val: any) => {
//         if (acc.length === 0) acc.push([]);
//         const last = acc[acc.length - 1];
//         if (last.length < size) {
//             last.push(val);
//         } else {
//             acc.push([val]);
//         }
//         return acc;
//     }, []);
// }
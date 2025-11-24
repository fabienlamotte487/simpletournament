import React from 'react'
import Backbutton from '../Buttons/backbutton';
import { shapePageProps } from '@/src/types/page';

function ShapePage(props:shapePageProps) {
    const {children, back = false} = props;

    return (
        <>
            {back && 
                <Backbutton />
            }
            {children}
        </>
    )
}

export default ShapePage
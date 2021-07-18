import React, { useState } from 'react';
import Link from 'next/link'
import Header from '../components/header'
import { getSubDistrictsGroupByDistrict } from '../lib/api';
import FullWidthTabs from '../components/tab/all'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip';

interface IProps {
    districts: DistrictResponse[]
    preview: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
    tagHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    tagSelect: {
    },
    tagsContainer: {
    },
    chip: {
        margin: theme.spacing(0, 1, 1, 0),
    },
}))

function ShowTogglableTagList({ items }) {
    const [isShowAll, setIsShowAll] = useState(false)
    const classes = useStyles()

    return (
        <div className={classes.tagsContainer}>
            <div className={classes.tagHeader}>
                <h3>{items.name}</h3>
                <span onClick={() => setIsShowAll(!isShowAll)}>{isShowAll ? '更少' : '更多'}</span>
            </div>
            {items.subDistricts
                .filter((subDistrict) => isShowAll ? true : subDistrict.isHot)
                .sort((a) => {
                    if (a.isHot) {
                        return -1
                    }
                    return 1
                })
                .map((subDistrict) => (
                    <Link href={`/sub-districts/${subDistrict.slug}`}>
                        <Chip
                            className={classes.chip}
                            key={subDistrict.name}
                            label={subDistrict.name}
                        />
                    </Link>
                ))}
        </div>
    )
}

function All({ areas, preview }: IProps) {
    const tabConfig = [
        {
            label: '地區',
            content: <>{
                areas.map(area => <ShowTogglableTagList items={area} />)}</>
        },
        {
            label: '所有分類',
            content: <>all Cat</>
        }
    ]
    return (
        <>
            <Header />
            <FullWidthTabs tabs={tabConfig} />
        </>
    )
}

export default All


export async function getStaticProps({ preview = false }) {
    const areas = await getSubDistrictsGroupByDistrict(preview)
    return {
        props: { areas, preview },
        revalidate: 1,
    }
}

import React, { useState } from 'react';
import { FilterResponse } from '../types'
import { Carpark } from '../types/Carpark'
import Header from '../components/header'
import { StyledText } from '../components/StyledText'
import { getCarparks, getFilters } from '../lib/api'
import Container from '@material-ui/core/Container'
import Chip from '@material-ui/core/Chip'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import { useRouter } from 'next/router'
import { SubDistrict } from '../types/DistrictResponse';

interface PageProps {
    carparks: Carpark[]
    filters: FilterResponse
}

interface IProps {
    key: string
    carpark: Carpark
}

interface KeyEleProps {
    name: string
}


const useStyles = makeStyles((theme: Theme) => ({
    card: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    filterOptionContainer: {

    }
}))

function Filters({ selectedFilters, onFilterClick }) {
    const classes = useStyles()
    return (
        <div>
            {
                Object.keys(selectedFilters).map(filterType => {
                    return (
                        <div>
                            <div>{filterType}</div>
                            <div className={classes.filterOptionContainer}>
                                {Object.keys(selectedFilters[filterType]).map(filterOption => {
                                    return (
                                        <Chip
                                            onClick={() => onFilterClick(filterType, filterOption)}
                                            variant={selectedFilters[filterType][filterOption] ? 'default' : 'outlined'}
                                            size='small'
                                            key={filterOption}
                                            label={filterOption}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

function CarparkListItem({ carpark }: IProps) {
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <StyledText size="h4" bold inline={false}>
                {carpark.name}
            </StyledText>

            <div>
                {carpark.subDistricts.map((subDistrict: SubDistrict) => {
                    return (
                        <StyledText size="body1" inline={true}>
                            {subDistrict.name}
                        </StyledText>
                    )
                })}
            </div>
        </Card>
    )
}


function Carparks({ carparks, filters }: PageProps) {
    const router = useRouter()

    const [selectedFilters, setSelectedFilters] = useState(router.query.subDistrict ? {
        ...filters,
        subDistricts: {
            ...filters['subDistricts'],
            [router.query.subDistrict]: true
        }
    } : filters)


    const allFilterClickListener = (filterType: string, filterProp: string) => {
        setSelectedFilters({
            ...selectedFilters,
            [filterType]: {
                ...selectedFilters[filterType],
                [filterProp]: !selectedFilters[filterType][filterProp]
            }
        })
    };


    const filteredCollected = () => {
        const collectedTrueKeys = {
            subDistricts: [],
            tags: [],
        };
        const { subDistricts, tags } = selectedFilters

        for (const subDistrictsKey in subDistricts) {
            if (subDistricts[subDistrictsKey]) collectedTrueKeys.subDistricts.push(subDistrictsKey);
        }

        for (const tagsKey in tags) {
            if (tags[tagsKey]) collectedTrueKeys.tags.push(tagsKey);
        }

        return collectedTrueKeys
    };



    const multiPropsFilter = (carparks: Carpark[], filters) => {
        const filterKeys = Object.keys(filters);
        return carparks.filter((carpark: Carpark) => {
            return filterKeys.every(key => {
                if (!filters[key].length) return true;
                // Loops again if carpark[key] is an array
                if (Array.isArray(carpark[key])) {
                    return carpark[key].some((keyEle : KeyEleProps) => {
                        return filters[key].includes(keyEle.name)
                    });
                }
                return filters[key].includes(carpark[key]);
            });
        });
    };

    const filterCarparks = () => {
        const filteredCarparks = multiPropsFilter(
            carparks,
            filteredCollected()
        );

        return filteredCarparks
    };

    return (
        <Container>
            <Header imageToTop={false} />
            <Filters
                selectedFilters={selectedFilters}
                onFilterClick={(filterType: string, filterProp: string) => allFilterClickListener(filterType, filterProp)} />
            <div>
                {filterCarparks().map((carpark: Carpark) => {
                    return (
                        <CarparkListItem
                            key={carpark._id}
                            carpark={carpark} />
                    )
                })}
            </div>
        </Container>
    )
}

export default Carparks

export async function getStaticProps({ preview = false }) {
    const carparks = await getCarparks(preview)
    const filters = await getFilters(preview)
    return {
        props: { carparks, filters, preview },
        revalidate: 1,
    }
}
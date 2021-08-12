import React, { useState } from 'react';
import { FilterResponse } from '../types'
import { Carpark } from '../types/Carpark'
import Header from '../components/header'
import { StyledText } from '../components/StyledText'
import { getCarparks, getFilters } from '../lib/api'
import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import { useRouter } from 'next/router'
import { SubDistrict } from '../types/DistrictResponse';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect } from 'react';

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
    panelDrawer: {
        '& .MuiDrawer-paper': {
            height: '100vh',
        }
    },
}))

function FilterSection({ title, filterOptions, updateSelection }) {
    console.log(`render FilterSection ${title}`)
    const [selectedOptions, setSelectedOptions] = useState(filterOptions)

    useEffect(() => {
        updateSelection(selectedOptions)
    }, [selectedOptions])

    return (
        <div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={false}
                        // onChange={handleChange}
                        name="checkedF"
                        indeterminate
                    />
                }
                label={title}
            />
            <div>
                {selectedOptions.map((option, i) => {
                    return (
                        <Chip
                            onClick={() => {
                                const newSelectOptions = [...selectedOptions]
                                newSelectOptions[i].checked = !newSelectOptions[i].checked
                                setSelectedOptions(newSelectOptions)
                            }}
                            variant={option.checked ? 'default' : 'outlined'}
                            size='small'
                            key={option.slug}
                            label={option.name}
                        />
                    )
                })}
            </div>
        </div>
    )
}

function FilterDrawer({ title, parent, child, applyFilters }) {
    console.log('render FilterDrawer')
    const classes = useStyles()

    const initializeFilter = () => parent.map(parentItem => {
        return {
            ...parentItem,
            checked: false,
            partial: false,
            [child]: parentItem[child].map(childItem => ({
                ...childItem,
                checked: false,
            }))
        }
    })


    const [isPanelOpen, setIsPanelOpen] = useState(true)
    const [selectedFilter, setSelectedFilter] = useState(initializeFilter())


    if (!isPanelOpen) {
        return (
            <div
                onClick={() => setIsPanelOpen(true)}
            >
                {title}
            </div>
        )
    }
    return (
        <Drawer className={classes.panelDrawer}
            anchor={'bottom'}
            open={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
        >
            <div>
                <CloseIcon onClick={() => setIsPanelOpen(false)} />
            </div>
            <div>
                {
                    selectedFilter.map((filter, i) => {
                        return (
                            <FilterSection
                                title={filter.name}
                                filterOptions={filter[child]}
                                updateSelection={updateSelections => {
                                    const newSelectedFilter = [...selectedFilter]
                                    newSelectedFilter[i][child] = updateSelections
                                    setSelectedFilter(newSelectedFilter)
                                }}
                            />
                        )
                    })
                }
            </div>
            <div>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        applyFilters(selectedFilter)
                        setIsPanelOpen(false)
                    }}
                >
                    繼續
                </Button>
            </div>
        </Drawer>
    )
}

function Filters({ selectedFilters, onFilterChange }) {
    const classes = useStyles()

    const [groupedFilter, setGroupedFilter] = useState(selectedFilters)

    useEffect(() => {
        onFilterChange(groupedFilter)
    }, [groupedFilter]);

    return (
        <div>
            <FilterDrawer
                title={'地區'}
                parent={selectedFilters.areas}
                child={'subDistricts'}
                applyFilters={areaOptions => setGroupedFilter({
                    ...groupedFilter,
                    areas: areaOptions
                })}
            />
            <FilterDrawer
                title={'分類'}
                parent={selectedFilters.categories}
                child={'tags'}
                applyFilters={categoryOptions => setGroupedFilter({
                    ...groupedFilter,
                    categories: categoryOptions
                })}
            />
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

    const [masterFilter, setMasterfilter] = useState(filters)
    console.log('mom knows:', masterFilter)



    const filteredCollected = (filters) => {
        const collectedTrueKeys = {
            subDistricts: [],
            tags: [],
        };
        const { areas, categories } = filters

        for (const area of areas) {
            for (const subDistrict of area.subDistricts) {
                if (subDistrict.checked) {
                    collectedTrueKeys.subDistricts.push(subDistrict.slug)
                }
            }
        }

        // for (const tagsKey in tags) {
        //     if (tags[tagsKey]) collectedTrueKeys.tags.push(tagsKey);
        // }

        return collectedTrueKeys
    };



    const filterCarparks = (carparks: Carpark[], filters) => {

        const filterKeys = ['subDistricts'] // Object.keys(filters);
        const collectedFilters = filteredCollected(filters)
        // console.log('collectedFilters', collectedFilters)
        // console.log('filterKeys', filterKeys)
        return carparks.filter((carpark: Carpark) => {
            const carparkSlugKeys = carpark['subDistricts'].map(e => e.slug)
            // return filterKeys.every(key => {
            // console.log(filters['areas'])
            // if (!filters[key].length) return true;
            // // Loops again if carpark[key] is an array
            if (Array.isArray(carparkSlugKeys)) {
                // console.log(collectedFilters[filterKeys])
                return carparkSlugKeys.some((keyEle: KeyEleProps) => {
                    return collectedFilters[filterKeys[0]].includes(keyEle)
                });
            }
            // });
        });
    };

    return (
        <Container>
            <Header imageToTop={false} />
            <Filters
                selectedFilters={masterFilter}
                onFilterChange={e => setMasterfilter(e)}
            />
            <div>
                {filterCarparks(carparks, masterFilter).map((carpark: Carpark) => {
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
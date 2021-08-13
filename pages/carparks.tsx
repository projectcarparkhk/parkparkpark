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

const isAllChecked = options => options.every(option => option.checked)
const isSomeChecked = options => options.some(option => option.checked)

function FilterSection({ title, filterOptions, updateSelection }) {

    // console.log(`render FilterSection ${title}`)

    const [parentCheckBoxState, setParentCheckBoxState] = useState(() => {
        if (isAllChecked(filterOptions)) {
            return 'all'
        }

        if (isSomeChecked(filterOptions)) {
            return 'some'
        }
        return 'none'
    })

    const [selectedOptions, setSelectedOptions] = useState(filterOptions)
    useEffect(() => {
        updateSelection(selectedOptions)
    }, [selectedOptions])

    return (
        <div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={parentCheckBoxState === 'all'}
                        onChange={() => {
                            if (parentCheckBoxState === 'all') {
                                setParentCheckBoxState('none')
                                setSelectedOptions(selectedOptions.map(option => ({
                                    ...option,
                                    checked: false
                                })))
                            } else if (parentCheckBoxState === 'some') {
                                if (!isAllChecked(selectedOptions) && !isSomeChecked(selectedOptions)) {
                                    setParentCheckBoxState('all')
                                    setSelectedOptions(selectedOptions.map(option => ({
                                        ...option,
                                        checked: true
                                    })))
                                }
                                setParentCheckBoxState('none')
                                setSelectedOptions(selectedOptions.map(option => ({
                                    ...option,
                                    checked: false
                                })))
                            } else {
                                setParentCheckBoxState('all')
                                setSelectedOptions(selectedOptions.map(option => ({
                                    ...option,
                                    checked: true
                                })))
                            }

                        }}
                        name="checkedF"
                        indeterminate={parentCheckBoxState === 'some'}
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

                                if (isAllChecked(newSelectOptions)) {
                                    setParentCheckBoxState('all')
                                } else if (!isAllChecked(newSelectOptions) && !isSomeChecked(newSelectOptions)) {
                                    setParentCheckBoxState('none')
                                } else {
                                    setParentCheckBoxState('some')
                                }

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
    // console.log('render FilterDrawer')
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


    const [isPanelOpen, setIsPanelOpen] = useState(false)
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

    for (const category of categories) {
        for (const tag of category.tags) {
            if (tag.checked) {
                collectedTrueKeys.tags.push(tag.slug)
            }
        }
    }

    return collectedTrueKeys
};

const filterCarparks = (carparks: Carpark[], filters) => {
    const filterKeys = ['subDistricts', 'tags']
    const collectedFilters = filteredCollected(filters)
    return carparks.filter((carpark: Carpark) => {
        return filterKeys.every(key => {
            if (!collectedFilters[key].length) {
                return true
            }
            return carpark[key].map(e => e.slug).some((keyEle: KeyEleProps) => {
                return collectedFilters[key].includes(keyEle)
            })
        })
    });
};

function presetFilter(filters, options) {
    // TODO incorect logic, filter should be initialized in parent
    const { areas } = filters
    if (options['subDistrict']) {
        console.log(options['subDistrict'])
        for (const [i, area] of areas.entries()) {
            for (const [j, subDistrict] of area['subDistricts'].entries()) {
                if (subDistrict.slug === options['subDistrict']) {
                    console.log(areas[i]['subDistricts'][j].checked = true)
                    return {
                        ...filters,
                        areas
                    }
                }
            }
        }

    }
    return filters
}

function Carparks({ carparks, filters }: PageProps) {
    const router = useRouter()

    const [masterFilter, setMasterfilter] = useState(presetFilter(filters, router.query))

    return (
        <Container>
            <Header imageToTop={false} />
            <FilterDrawer
                title={'地區'}
                parent={masterFilter.areas}
                child={'subDistricts'}
                applyFilters={areaOptions => setMasterfilter({
                    ...masterFilter,
                    areas: areaOptions
                })}
            />
            <FilterDrawer
                title={'分類'}
                parent={masterFilter.categories}
                child={'tags'}
                applyFilters={categoryOptions => setMasterfilter({
                    ...masterFilter,
                    categories: categoryOptions
                })}
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
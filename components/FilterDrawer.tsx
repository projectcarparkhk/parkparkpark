import React, { useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Theme, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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
    filterDrawerHeader: {
        height: theme.spacing(6),
        padding: theme.spacing(1.5 ,1.5 ,1.5, 0)
    },
    filterCatelogue: {
        display: 'flex',
    },
    filterTypeButton: {
        display: 'flex',
        padding: theme.spacing(1),
        '& .MuiFormControlLabel-label': {
            fontSize: '1rem',
        }
    },
    filterOptionContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        '& .MuiChip-root': {
            margin: theme.spacing(0, 1, 0.75, 0),
        }
    }
}))

interface FilterOption {
    checked: boolean
    isHot: boolean
    name: string
    slug: string
}

interface FilterSectionProps {
    title: string
    filterOptions: FilterOption[]
    updateSelection(selectedOptions: FilterOption[]): string
}

// interface Filter {
//     areas: 
//     categories
// }

interface FilterConfig {
    areas?: string,
    categories?: string
}


interface FilterCatelogueProps {
    config: FilterConfig
    applyFilterCatelogue(activeItem: string): string
}

interface KeyEleProps {
    name: string
}

const isAllChecked = (options: FilterOption[]) => options.every(option => option.checked)
const isSomeChecked = (options: FilterOption[]) => options.some(option => option.checked)

function FilterSection({ title, filterOptions, updateSelection }: FilterSectionProps) {
    const classes = useStyles()
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
                        color="primary"
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
            <div className={classes.filterOptionContainer}>
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

function filteredCollected(filters: FilterConfig) {
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
}

export function FilterCatelogue({ config, applyFilterCatelogue }: FilterCatelogueProps) {
    const classes = useStyles()

    return (
        <div className={classes.filterCatelogue}>
            {
                Object.keys(config).map(value => {
                    return (
                        <div 
                            className={classes.filterTypeButton}    
                            onClick={() => applyFilterCatelogue(value)}
                        >
                            <div>
                                {value}
                            </div>
                            <ExpandMoreIcon />
                        </div>
                    )
                })
            }
        </div>
    )
}

export function initializeFilter(filters, config, prefill) {
    const newFilters = { ...filters}
    Object.keys(newFilters).forEach(parentKey => {
        newFilters[parentKey] = newFilters[parentKey].map(parentItem => ({
            ...parentItem,
            [config[parentKey]]: parentItem[config[parentKey]].map(childItem => {
                const prefillValues = prefill[config[parentKey]] || ''
                return {
                    ...childItem,
                    checked: prefillValues.split(',').includes(childItem.slug) ? true : false,
                }
            })
        }))
    })
    return newFilters
}

export function filterItems(items, filters, config){
    const filterKeys = Object.values(config)
    const collectedFilters = filteredCollected(filters)
    return items.filter((item) => {
        return filterKeys.every(key => {
            if (!collectedFilters[key].length) {
                return true
            }
            return item[key].map(e => e.slug).some((keyEle: KeyEleProps) => {
                return collectedFilters[key].includes(keyEle)
            })
        })
    });
}

interface FilterDrawerProps {
    filters: FilterOption[]
    child: string
    applyFilters(option: FilterOption[]): FilterOption[]
    applyFilterCatelogue(filterType: string): string
}

export function FilterDrawer({ filters, child, applyFilters, applyFilterCatelogue }: FilterDrawerProps) {
    const classes = useStyles()
    const [selectedFilter, setSelectedFilter] = useState(filters)
    
    return (
        <Drawer className={classes.panelDrawer}
            anchor={'bottom'}
            open={true}
            onClose={() => applyFilterCatelogue('')}
        >
            <Container maxWidth="lg">
            <div className={classes.filterDrawerHeader}>
                <CloseIcon onClick={() => applyFilterCatelogue('')} />
                {/* <Button
                    variant="outlined"
                    onClick={() => {
                        const newSelectedFilters = selectedFilter.map(parentItem => ({
                            ...parentItem,
                            [child]: parentItem[child].map(childItem => ({
                                ...childItem,
                                checked: false
                            }))
                        }))
                        setSelectedFilter(newSelectedFilters)
                        applyFilters(newSelectedFilters)
                    }}
                >
                    清除
                </Button> */}
            </div>
            <div>
                {
                    selectedFilter.map((filter: FilterOption, i: number) => {
                        return (
                            <FilterSection
                                key={filter.name}
                                title={filter.name}
                                filterOptions={filter[child]}
                                updateSelection={(updateSelections: FilterOption[]) => {
                                    const newSelectedFilter: FilterOption[] = [...selectedFilter]
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
                        applyFilterCatelogue('')
                    }}
                >
                    繼續
                </Button>
            </div>
            </Container>
        </Drawer>
    )
}
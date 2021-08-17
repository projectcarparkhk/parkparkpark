import React, { useState, useEffect, useMemo } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Theme, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {
    Area,
    Category,
    FilterResponse,
    FilterOption,
    FilterConfig,
    SubFilterConfig,
    FilterCatelogueProps,
    FilterSectionProps,
    FilterDrawerProps,
    FilterableItem,
} from '../types/FilterResponse'
import translations from '../locales/components/filterDrawer'
import { useRouter } from 'next/router'

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

const isAllChecked = (options: FilterOption[]) => options.every(option => option.checked)
const isSomeChecked = (options: FilterOption[]) => options.some(option => option.checked)

function FilterSection({ title, selection, updateSelection }: FilterSectionProps) {
    const classes = useStyles()
    //const [parentCheckBoxState, setParentCheckBoxState] = useState(() => {
    //    if (isAllChecked(selection)) {
    //        return 'all'
    //    }

    //    if (isSomeChecked(selection)) {
    //        return 'some'
    //    }
    //    return 'none'
    //})

    // i think the selection should be the only source of truth and should govern the "prop" of the parent checkbox
    // therefore should not have its own state
    const parentCheckBoxStatus = useMemo(() => {
      if (selection.every(option => option.checked)) {
        return 'all'
      } else if (selection.some(option => option.checked)){
        return 'some'
      } else {
        return 'none'
      }
    }, [selection])

    const [selectedOptions, setSelectedOptions] = useState(selection)
    useEffect(() => {
        updateSelection(selectedOptions)
    }, [selectedOptions])

    return (
        <div>
            <FormControlLabel
                control={
                    <Checkbox
                        color="primary"
                        checked={parentCheckBoxStatus === 'all'}
                        onChange={() => {
                            if (parentCheckBoxStatus === 'all') {
                                setSelectedOptions(selectedOptions.map(option => ({
                                    ...option,
                                    checked: false
                                })))
                            } else if (parentCheckBoxStatus === 'some') {
                                setSelectedOptions(selectedOptions.map(option => ({
                                    ...option,
                                    checked: false
                                })))
                            } else {
                                setSelectedOptions(selectedOptions.map(option => ({
                                    ...option,
                                    checked: true
                                })))
                            }

                        }}
                        name="checkedF"
                        indeterminate={parentCheckBoxStatus === 'some'}
                    />
                }
                label={title}
            />
            <div className={classes.filterOptionContainer}>
                {selectedOptions.map((option, i: number) => {
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

function filteredCollected(filters: FilterResponse) {
    const collectedTrueKeys: {
        subDistricts: string[]
        tags: string[]
    } = {
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
    const { locale } = useRouter()
    return (
        <div className={classes.filterCatelogue}>
            {
                Object.keys(config).map((value) => {
                    return (
                        <div 
                            key={value}
                            className={classes.filterTypeButton}    
                            onClick={() => applyFilterCatelogue(value)}
                        >
                            <div>
                                {translations[locale || 'zh'][value]}
                            </div>
                            <ExpandMoreIcon />
                        </div>
                    )
                })
            }
        </div>
    )
}

export function initializeFilter(filters: FilterResponse, config: FilterConfig, prefill: FilterConfig) {
    const newFilters: FilterResponse = { ...filters}
    Object.keys(newFilters).forEach((parentKey: string) => {
        newFilters[parentKey] = newFilters[parentKey].map((parentItem: (Area | Category)[]) => ({
            ...parentItem,
            [config[parentKey]]: parentItem[config[parentKey]].map((childItem: FilterOption) => {
                const prefillValues = prefill[config[parentKey]] || ''
                return {
                    ...childItem,
                    checked: prefillValues.split(',').includes(childItem.slug) ? true : false,
                }
            })
        }))
    })
    console.log("newFilters",newFilters)
    return newFilters
}

export function filterItems(items: FilterableItem[], filters: FilterResponse, config: FilterConfig){
    const filterKeys = Object.values(config)
    const collectedFilters = filteredCollected(filters)
    return items.filter((item: FilterableItem) => {
        return filterKeys.every((key: keyof SubFilterConfig) => {
            if (!collectedFilters[key].length) {
                return true
            }
            return item[key].map(e => e.slug).some((keyEle: string) => {
                return collectedFilters[key].includes(keyEle)
            })
        })
    });
}



export function FilterDrawer({ filters, child, applyFilters, applyFilterCatelogue }: FilterDrawerProps) {
    const classes = useStyles()
    const [selectedFilter, setSelectedFilter] = useState<(Area | Category)[] | null>(filters)
    
    return (
        <Drawer className={classes.panelDrawer}
            anchor={'bottom'}
            open={true}
            onClose={() => applyFilterCatelogue(null)}
        >
            <Container maxWidth="lg">
            <div className={classes.filterDrawerHeader}>
                <CloseIcon onClick={() => applyFilterCatelogue(null)} />
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
                    selectedFilter && selectedFilter.map((filter: (Area | Category), i: number) => {
                        return (
                            <FilterSection
                                key={filter.name}
                                title={filter.name}
                                selection={child && filter[child]}
                                updateSelection={(updateSelections: FilterOption[]) => {
                                    const newSelectedFilter: (Area | Category)[] = [...selectedFilter]
                                    if (child) {
                                        newSelectedFilter[i][child] = updateSelections
                                        setSelectedFilter(newSelectedFilter)
                                    }
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
                        applyFilterCatelogue(null)
                    }}
                >
                    繼續
                </Button>
            </div>
            </Container>
        </Drawer>
    )
}
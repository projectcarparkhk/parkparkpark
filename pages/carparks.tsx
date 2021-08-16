import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import { StyledText } from '../components/StyledText'
import { getCarparksforFilters } from '../sanityApi/carparks'
import { getFilters } from '../sanityApi/filters'
import Container from '@material-ui/core/Container'
import { Theme, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import { useRouter } from 'next/router'
import { SubDistrict } from '../types/DistrictResponse';
import {
    Area,
    Category,
    FilterConfig,
    SubFilterConfig,
    FilterResponse, 
    FilterOption,
    FilterableItem,
} from '../types/FilterResponse'
import { FilterDrawer, initializeFilter, filterItems, FilterCatelogue } from '../components/FilterDrawer'

const FILTER_CONFIG: FilterConfig = {
    areas: 'subDistricts',
    categories: 'tags'
}
interface PageProps {
    carparks: FilterableItem[]
    filters: FilterResponse
}
interface IProps {
    key: string
    carpark: FilterableItem
}

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}))


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
    const [masterFilter, setMasterfilter] = useState<FilterResponse>(filters)
    const [activePanel, setActivePanel] = useState<null | keyof FilterConfig>(null)

    useEffect(() => {
        setMasterfilter(initializeFilter(filters, FILTER_CONFIG, router.query))
    }, [router])

    return (
        <Container>
            <Header imageToTop={false} />
            <FilterCatelogue
                applyFilterCatelogue={(activeItem: keyof FilterConfig) => setActivePanel(activeItem)}
                config={FILTER_CONFIG} />
            {activePanel && <FilterDrawer
                filters={activePanel && masterFilter[activePanel]}
                child={activePanel && FILTER_CONFIG[activePanel]}
                applyFilters={(listOptions: Area[] | Category[] | null) => setMasterfilter({
                    ...masterFilter,
                    [activePanel]: listOptions
                })}
                applyFilterCatelogue={(activeItem: keyof FilterConfig) => setActivePanel(activeItem)}
            />}
            <div>
                {filterItems(carparks, masterFilter, FILTER_CONFIG).map((carpark: FilterableItem) => {
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
    const carparks = await getCarparksforFilters(preview)
    const filters = await getFilters(preview)
    return {
        props: { carparks, filters, preview },
        revalidate: 1,
    }
}
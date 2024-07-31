import Button from "@components/common/Button"
import {
  Direction,
  DropDown,
  DropDownContent,
  DropDownItem,
  DropDownTrigger,
} from "@components/common/DropDown"
import { useNavigate, useParams } from "@tanstack/react-router"
import { useRegions } from "medusa-react"
import { FC, useState } from "react"
import { GlobalParams } from "src/types/global"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { css } from "@emotion/react"
import { Country } from "@medusajs/medusa"
import { useLocation } from "@tanstack/react-router"

type CountryListProps = {
  direction?: Direction
}

const CountryList: FC<CountryListProps> = ({ direction = "under" }) => {
  const { countryCode } = useParams({ strict: false }) as GlobalParams
  const { regions } = useRegions()
  const navigate = useNavigate()
  const location = useLocation()

  const [selectedRegion, setSelectedRegion] = useState(countryCode)

  const handleSelectCountry = ({ iso_2 }: Country) => {
    setSelectedRegion(iso_2)

    const newPath = location.pathname.replace(`/${countryCode}`, `/${iso_2}`)
    navigate({
      to: newPath,
      replace: true,
    })
  }

  return (
    <DropDown>
      <DropDownTrigger asChild>
        <Button
          variant="ghost"
          css={css`
            display: flex;
            align-items: center;
            gap: 2px;

            & span {
              display: flex;
              align-items: center;
            }
          `}
        >
          {selectedRegion.toUpperCase()}
          <motion.span>
            <ChevronDown size={16} />
          </motion.span>
        </Button>
      </DropDownTrigger>
      <DropDownContent direction={direction}>
        {regions?.map(({ countries }) =>
          countries.map((country) => (
            <DropDownItem
              onClick={() => handleSelectCountry(country)}
              key={country.id}
            >
              {country.name}
            </DropDownItem>
          )),
        )}
      </DropDownContent>
    </DropDown>
  )
}

export default CountryList

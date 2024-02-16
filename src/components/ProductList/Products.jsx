import { Button, ButtonGroup } from "reactstrap"
import { bestseller } from "../../mock/bestSellerData"
import ProductCard from "./ProductCard"


export default function Products() {

    return (
        <div className="w-screen flex flex-col">
            <div className="my-0 mx-auto max-w-[1050px]">
                <div className="flex justify-between items-center py-6">
                    <p className="text-[#737373] font-bold text-sm leading-6">Showing all X! results</p>
                    <div className="flex items-center gap-3.5">
                        <p className="text-[#737373] font-bold text-sm leading-6">Views: </p>
                        <button className="h-[46px] w-[46px] border-[1px] rounded">+</button>
                        <button className="h-[46px] w-[46px] border-[1px] rounded">-</button>
                    </div>
                    <div className="flex gap-3.5">
                        <select name="vals" id="vals" className="pl-3 border-[1px] w-[150px] text-[#737373] bg-[#DDDDDD] rounded">
                            <option value="val1">Popularity</option>
                            <option value="val2">Val2</option>
                            <option value="val3">Val3</option>
                            <option value="val4">Val4</option>
                        </select>
                        <button className="px-5 py-2.5 text-white bg-[#23A6F0] rounded">Filter</button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-x-7 gap-y-20 justify-center py-12">
                    {bestseller.map((item, index) => {
                        return <ProductCard key={index} data={item} size={[240, 300]} />
                    })}
                </div>
                <div className="w-full flex justify-center pb-12">
                    <ButtonGroup className="me-2">
                        <Button color="light" size="lg" className="border-2 border-inherit" >
                            First
                        </Button>
                        <Button color="light" size="lg" className="border-2 border-inherit">
                            1
                        </Button>
                        <Button color="primary" size="lg" className="border-2 border-inherit"  >
                            2
                        </Button>
                        <Button color="light" size="lg" className="border-2 border-inherit">
                            3
                        </Button>
                        <Button color="light" size="lg" className="border-2 border-inherit">
                            Next
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}
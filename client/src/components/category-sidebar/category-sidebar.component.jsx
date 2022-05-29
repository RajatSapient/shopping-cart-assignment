import React from 'react'
import downArrow from "../../assets/images/downArrow.png"


const CategorySidebar = (props) => {
    const { categories, screenSize, show, setShow, tabStatus, setTabStatus } = props
    return (
        <>
            {screenSize < 768 ?
                tabStatus === "all" ?
                    <div className={`ecom-categoriesHeader-mob ecom-justify-content-between ecom-flex ecom-w-100 ecom-align-items-center ${show ? '' : 'ecom-mb-30'}`}>
                        <h1>All Categories</h1>
                        <div style={{ width: "20px" }}>
                            <img
                                src={downArrow}
                                onClick={() => setShow(!show)}
                                alt="downArrow"
                                style={{ width: "100%", height: "auto" }}
                                className={show ? 'arwup' : 'arwdown'}
                            />
                        </div>
                    </div>
                    :
                    <div className={`ecom-categoriesHeader-mob ecom-justify-content-between ecom-flex ecom-w-100 ecom-align-items-center ${show ? '' : 'ecom-mb-30'}`}>
                        <h1>{categories.map(({ name, id }) => { if (tabStatus === id) return name })}</h1>
                        <div style={{ width: "20px" }}>
                            <img
                                src={downArrow}
                                onClick={() => setShow(!show)}
                                alt="downArrow"
                                style={{ width: "100%", height: "auto" }}
                                className={show ? 'arwup' : 'arwdown'} />
                        </div>
                    </div>
                :
                null
            }

            {screenSize < 768 ?
                show ? <div className="ecom-product-category-sidebar" id="category-sidebar">
                    <ul>
                        {categories.map(({ id, name }) => {
                            return (
                                <li
                                    key={id}
                                    onClick={() => setShow(!show)}
                                    className={tabStatus === id ? "active active-mob cursor-pointer " : "cursor-pointer "}
                                >
                                    <a
                                        className={tabStatus === id ? "active cursor-pointer" : "cursor-pointer "}
                                        onClick={() => setTabStatus(id)}
                                    >
                                        {name}
                                    </a>
                                </li>)
                        })
                        }
                    </ul>
                </div>
                    : null
                :

                <div className="ecom-product-category-sidebar" id="category-sidebars">
                    <ul>
                        {categories.map(({ id, name }) => {
                            return (
                                <li key={id} onClick={() => setShow(!show)} className={tabStatus === id ? "active cursor-pointer" : "cursor-pointer "}>
                                    <a className={tabStatus === id ? "active cursor-pointer" : "cursor-pointer "} onClick={() => setTabStatus(id)}>{name}</a>
                                </li>)
                        })
                        }
                    </ul>
                </div>

            }</>
    )
}

export default CategorySidebar
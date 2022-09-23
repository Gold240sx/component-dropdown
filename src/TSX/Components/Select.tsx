import styles from './select.module.css';
import { useState, useEffect, useRef } from "react";

//==============================Typescript================================//

const Placeholder = "SELECT";

export type SelectOption = {
    priced?: boolean
    named?: boolean
    valued?: false
    titled?: boolean
    label: string
    value: string | number
    price: string | number
    name?: string | number
}

type SingleSelectProps = {
    multiple?: false
    price?: SelectOption
    value?: SelectOption
    name?: SelectOption
    onChange: (value: SelectOption | undefined) => void
}

type MultipleSelectProps = {
    multiple: true
    value?: SelectOption
    name?: SelectOption
    onChange: (value: SelectOption[]) => void
}

type SelectProps = {
    options: SelectOption[]
} & ( SingleSelectProps | MultipleSelectProps )

export function Select({ valued, named, priced, titled, multiple, value, onChange, options }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null)

    function clearOptions() {
        multiple ? onChange([]) : onChange(undefined)
    }

    function selectOption(option: SelectOption) {
        if (multiple) {
            if ( value?.includes(option)) {
                onChange(value.filter(o => o !== option))
            } else {
                onChange([...value, option])
            }
        } else {
            if (option !== value) {onChange(option)}
        }
    }

    function isOptionSelected(option: SelectOption) {
        return multiple ? value.includes(option) : option === value;
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target != containerRef.current) return
            switch (e.code) {
                case "Enter" :
                case "Space":
                    setIsOpen(!isOpen)
                    case "Space":
                        if (isOpen) selectOption(options[highlightedIndex])
                        break
                        case "ArrowUp":
                        case "ArrowDown":{
                            if (!isOpen) {
                                setIsOpen(true)
                                break
                            }

                            const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
                            
                            if (newValue >= 0 && newValue <options.length) {
                                setHighlightedIndex(newValue)
                            }
                            break
                        }
                           
                case "Escape":
                    setIsOpen(false)
                    break
            }
        }
        containerRef.current?.addEventListener("keydown", handler)

        return () => {
            containerRef.current
        }
    }, [isOpen, highlightedIndex, options ])

    return (
        <>
            <div 
                ref={containerRef}
                onBlur={() => setIsOpen(false)}
                onClick={() => setIsOpen(!isOpen)} 
                tabIndex={0} 
                className={styles.container}
            >
                <span className={styles.value}>
                     {multiple && !value?.length ? Placeholder : <></>}
                    
                    {/* // MULTI */}
                    {multiple ? value.map(
                        v => (
                            <button key={v.value} className={styles["option-badge"]} onClick={e => {
                                e.stopPropagation();
                                selectOption(v);
                            }}>
                                {
                                    (valued && named)
                                    ? "Select Option Conflict" :
                                        titled ? ( <>
                                                        {priced ? v.price + " - " : ""} 
                                                        <label className="multi-label">{v.label}</label>
                                                        <p>{v.value}</p>
                                                    </>
                                        ) :
                                            priced ? (
                                                `${v.price} - ` + 
                                                `${named ? v.name :
                                                    valued ? v.value : 
                                                        v.label}`
                                            ) :
                                                named ? v.name :
                                                    valued ? v.value : 
                                                        v.label
                                }
                                <span className={styles["remove-btn"]}>&times;</span>
                            </button>
                            )
                        ) : 
                        // SINGLE
                            (valued && named)
                            ? "Select Option Conflict" :
                            value === undefined ? <>{Placeholder}</> :
                                titled ? (  <>
                                                <p className='price'></p>{priced ? value?.price + " - " : ""} 
                                                <label className="multi-label">{value?.label}</label>
                                                <p className='value'>{value?.value}</p>
                                            </>
                                            ) :
                                                priced ? (
                                                    `${value?.price} - ` + 
                                                    `${named ? value?.name :
                                                        valued ? value?.value : 
                                                            value?.label}`
                                                ) :
                                                    named ? value?.name :
                                                        valued ? value?.value : 
                                                            value?.label
                    } 
                </span>
                {(!multiple && value) || (multiple && value?.length) ?
                    <button 
                        onClick={e => {
                            clearOptions();
                            e.stopPropagation();
                        }}
                        className={styles["clear-btn"]}
                        >&times;</button>
                    : <></>
                }
                <div className={styles.divider}></div>
                <div className={` ${styles.caret } ${isOpen ? styles.rotate : ""}`}></div>
                <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                    
                    {/* Dropdown Items */}
                    {options.map((option, index) => (
                        <li 
                            key={option.value} 
                            className={`
                                ${styles.option} 
                                ${isOptionSelected(option) ? styles.selected : ""}
                                ${index === highlightedIndex ? styles.highlighted : ""}
                            `}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            onClick={(e) => {
                                e.stopPropagation();
                                selectOption(option);
                                setIsOpen(false)
                            }}
                        >{
                            (valued && named)
                            ? "Select Option Conflict" :
                            //  titled ? (  <>
                            //                     <p className='price'></p>{priced ? value?.price + " - " : ""} 
                            //                     <label className="multi-label">{value?.label}</label>
                            //                     <p className='value'>{value?.value}</p>
                            //                 </>
                            //                 ) :
                            priced ? (
                                option?.price + " - " + 
                                `${named ? option?.name :
                                    valued ? option?.value : 
                                        option?.label}`
                            ) :
                                named ? option?.name :
                                    valued ? option?.value : 
                                        option?.label
                        }
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
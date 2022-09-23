import styles from './select.module.css';
import { useState, useEffect, useRef } from "react";

//==============================Typescript================================//
export type SelectOption = {
    label: string
    value: string | number
}

type SingleSelectProps = {
    multiple?: false
    value?: SelectOption
    onChange: (value: SelectOption | undefined) => void
}

type MultipleSelectProps = {
    multiple: true
    value?: SelectOption
    onChange: (value: SelectOption[]) => void
}

type SelectProps = {
    options: SelectOption[]
} & ( SingleSelectProps | MultipleSelectProps )

export function Select({ multiple, value, onChange, options }: SelectProps) {
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
                        // case "Enter":
                        // case "Space":{
                        //     const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)

                        //     if (newValue >= 0 && newValue <options.length) {
                        //         setHighlightedIndex(newValue)
                        //     }
                        // }
                        // break
                           
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
                    {multiple ? value.map(
                        v => (
                            <button key={v.value} className={styles["option-badge"]} onClick={e => {
                                e.stopPropagation();
                                selectOption(v);
                            }}>
                                {v.label}
                                <span className={styles["remove-btn"]}>&times;</span>
                            </button>
                        )
                    ) : value?.label}
                </span>
                {value  ?
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
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
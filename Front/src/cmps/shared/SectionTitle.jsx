export function SectionTitle({className,Icon,children,...restOfProps}){
    return (
        <div {...restOfProps} className={`section-title ${className}`}>
            <Icon className="icon"/>
            {children}
        </div>
    )
}

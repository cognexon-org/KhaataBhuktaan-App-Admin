export function FormInput({ label, ...props }) { return <label><span className="label">{label}</span><input className="input" {...props} /></label>; }
export function FormSelect({ label, children, ...props }) { return <label><span className="label">{label}</span><select className="input" {...props}>{children}</select></label>; }
export function FormTextarea({ label, ...props }) { return <label><span className="label">{label}</span><textarea className="input min-h-24" {...props} /></label>; }

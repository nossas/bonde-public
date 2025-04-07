import Busao0800 from '../bonde-webpage/plugins/Busao0800';

interface Input {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    widget_id: number;
    custom_fields?: any
}


export default (props: any) => (
    <Busao0800
        {...props}
        asyncWidgetActionCreate={async (args: Input) => {
            const response = await fetch("/api/actions/create", {
                method: "post",
                body: JSON.stringify(args),
                headers: { 'Content-Type': 'application/json' }
            })

            if (response.status === 201) {
                return response.json()
            }
            
            throw new Error("AsyncWidgetActionCreateError");
        }}
    />
)
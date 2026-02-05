from django import forms


class WidgetClassMixin:
    widget_class_map = {
        forms.TextInput: "input-field",
        forms.NumberInput: "input-field",
        forms.URLInput: "input-field",
        forms.EmailInput: "input-field",
        forms.PasswordInput: "input-field",
        forms.DateInput: "input-field",
        forms.DateTimeInput: "input-field",
        forms.Select: "input-field",
        forms.Textarea: "input-field",
        forms.CheckboxInput: "checkbox-field",
    }

    def _apply_widget_classes(self):
        for field in self.fields.values():
            widget = field.widget
            for widget_type, class_name in self.widget_class_map.items():
                if isinstance(widget, widget_type):
                    existing = widget.attrs.get("class", "")
                    if class_name not in existing.split():
                        widget.attrs["class"] = (
                            f"{existing} {class_name}".strip()
                        )
                    break

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._apply_widget_classes()

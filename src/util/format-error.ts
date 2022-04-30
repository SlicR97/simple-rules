const formatProperty = (prop: any) => {
  if (Array.isArray(prop)) {
    return `[${prop.toString()}]`
  }

  return prop;
}

export const formatError = (template: string, properties: Record<string, any>) => {
  return Object.entries(properties).reduce((_template, [key, value]) => _template.replace(`{${key}}`, formatProperty(value)), template);
}

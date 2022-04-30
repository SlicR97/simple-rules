export const formatError = (template: string, properties: Record<string, any>) => {
  return Object.entries(properties).reduce((_template, [key, value]) => _template.replace(`{${key}}`, value), template);
}

import { createControl, validateForm, validate } from "./formFramework";

describe("formFramework", () => {
  it("should create control", () => {
    const result = createControl({}, true);
    expect(result).toEqual({
      validation: true,
      valid: false,
      touched: false,
      value: "",
    });
  });

  it("should validate without validation", () => {
    const result = validate({});
    expect(result).toEqual(true);
  });
  it("should validate with validation required", () => {
    const result = validate("test", { required: true });
    expect(result).toEqual(true);
  });
  it("should validate with validation optional", () => {
    const result = validate("", { required: false });
    expect(result).toEqual(true);
  });

  it("should validateForm with valid control", () => {
    const result = validateForm({ test: { valid: true } });
    expect(result).toEqual(true);
  });
  it("should validateForm without valid control", () => {
    const result = validateForm({ test: { valid: false } });
    expect(result).toEqual(false);
  });
});

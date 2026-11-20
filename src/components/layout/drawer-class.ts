// drawerClass: كلاس السايدبار في الحالتين، وبيستخدمه السايدبار الفاتح والغامق
// الموبايل: درج ثابت على الشمال، ومستخبي برّه الشاشة لحد ما يتفتح
// من أول lg: بيرجع زي فيجما بالظبط، 360 بكسل وثابت وانت بتعمل سكرول
export function drawerClass(open: boolean) {
    const base =
        "fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] shrink-0 flex-col overflow-y-auto px-8 py-9 transition-[translate,visibility] duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-90 lg:max-w-none lg:px-10";

    // max-lg: الكلاسات دي بتشتغل بس على الشاشات الأصغر من lg، فالكمبيوتر مش بيتأثر بيها
    // invisible: وهو مقفول، الكيبورد ميدخلش على اللينكات اللي جواه
    return open ? base : `${base} max-lg:invisible max-lg:-translate-x-full`;
}

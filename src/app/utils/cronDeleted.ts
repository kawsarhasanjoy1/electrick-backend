import cron from "node-cron";
import { deleteOldSoftDeletedReviews } from "../modules/Review/services";

const cronDeleted = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("Running cron job to delete old soft deleted reviews...");
    const result = await deleteOldSoftDeletedReviews();
    console.log(`Deleted ${result.deletedCount} old reviews.`);
  });
};

export default cronDeleted;

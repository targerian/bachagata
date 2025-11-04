import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { FadeIn } from "@/common/animations";
import {
  AdminEditToggle,
  Button,
  ClassSkeleton,
  ConfirmDialog,
} from "@/common/components";
import { useAuth } from "@/hooks/useAuth";
import { type Class, supabase } from "@/lib/supabase";
import { AddClassModal, ClassListCard, EditClassModal } from "./components";

export const ClassesScreen: React.FC = () => {
  const { isAdmin } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [deletingClass, setDeletingClass] = useState<Class | null>(null);

  const fetchClasses = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .order("date_time", { ascending: true });

      if (error) throw error;
      setClasses(data || []);
    } catch (err) {
      console.error("Error fetching classes:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleDeleteClass = async () => {
    if (!deletingClass) return;

    try {
      // Delete image from storage if exists
      if (deletingClass.image_url) {
        const fileName = deletingClass.image_url.split("/").pop();
        if (fileName) {
          await supabase.storage.from("class-images").remove([fileName]);
        }
      }

      // Delete from database
      const { error } = await supabase
        .from("classes")
        .delete()
        .eq("id", deletingClass.id);

      if (error) throw error;

      await fetchClasses();
    } catch (err) {
      console.error("Error deleting class:", err);
    } finally {
      setDeletingClass(null);
    }
  };

  // Filter upcoming classes (future classes only for non-admin view)
  const upcomingClasses = isEditMode
    ? classes
    : classes.filter((c) => new Date(c.date_time) >= new Date());

  return (
    <main className="flex flex-col gap-10 mt-10 md:mt-16 px-4 md:px-10 lg:px-30 max-w-[1200px] mx-auto">
      {/* Admin Edit Toggle */}
      {isAdmin && (
        <AdminEditToggle isEditMode={isEditMode} onToggle={setIsEditMode} />
      )}

      {/* Add Class Modal */}
      <AddClassModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchClasses}
      />

      {/* Edit Class Modal */}
      {editingClass && (
        <EditClassModal
          isOpen={true}
          onClose={() => setEditingClass(null)}
          onSuccess={fetchClasses}
          classData={editingClass}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deletingClass !== null}
        onClose={() => setDeletingClass(null)}
        onConfirm={handleDeleteClass}
        title="Delete Class"
        message="Are you sure you want to delete this class? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />

      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4">
        <div className="flex flex-col gap-3 flex-1">
          <FadeIn direction="up" delay={0.1} useInView={false}>
            <p className="text-text-primary text-4xl md:text-5xl font-serif leading-tight tracking-[-0.033em]">
              Upcoming Classes
            </p>
          </FadeIn>
          <FadeIn delay={0.3} useInView={false}>
            <p className="text-text-secondary text-base font-normal leading-normal">
              {isEditMode
                ? "Manage your classes - add, edit, or remove classes."
                : "Browse our upcoming dance classes and book your spot."}
            </p>
          </FadeIn>
        </div>

        {/* Add Class Button (Admin Only) */}
        {isAdmin && isEditMode && (
          <FadeIn delay={0.2} useInView={false} className="w-full sm:w-auto">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              size="md"
              className="flex items-center gap-2 whitespace-nowrap w-full sm:w-auto"
            >
              Add Class
            </Button>
          </FadeIn>
        )}
      </div>

      {/* Classes List */}
      <div className="flex flex-col gap-6 p-4">
        {loading ? (
          <div className="flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <ClassSkeleton key={`class-skeleton-${i}-${Math.random()}`} />
            ))}
          </div>
        ) : upcomingClasses.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
            <p className="text-text-secondary text-lg">
              {isEditMode ? "No classes yet" : "No upcoming classes"}
            </p>
            {isAdmin && isEditMode && (
              <Button onClick={() => setIsAddModalOpen(true)} size="md">
                Add First Class
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {upcomingClasses.map((classData, index) => (
              <FadeIn key={classData.id} delay={index * 0.1} useInView={false}>
                <ClassListCard
                  classData={classData}
                  isEditMode={isEditMode}
                  onEdit={() => setEditingClass(classData)}
                  onDelete={() => setDeletingClass(classData)}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
